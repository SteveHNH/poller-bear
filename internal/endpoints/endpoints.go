package endpoints

import (
	"errors"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"poller-bear/internal/db"
	"poller-bear/internal/models"
	"poller-bear/internal/session"
)


func Home(c echo.Context) error {
  return c.String(http.StatusOK, "hello world!")
}

func CreatePollHandler() echo.HandlerFunc {
  return func(c echo.Context) error {
    var req struct {
      models.Poll
      DurationHours *int `json:"duration_hours,omitempty"`
    }

    if err := c.Bind(&req); err != nil {
      return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
    }

    poll := req.Poll

    // Set expiration time if duration is provided
    if req.DurationHours != nil && *req.DurationHours > 0 {
      expiresAt := time.Now().Add(time.Duration(*req.DurationHours) * time.Hour)
      poll.ExpiresAt = &expiresAt
    }

    // Validate poll data
    if err := validatePoll(&poll); err != nil {
      return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
    }

    if err := db.DB.Save(&poll).Error; err != nil {
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save the poll"})
    }

    return c.JSON(http.StatusOK, poll)
  }
}

func GetPollByIDHandler() echo.HandlerFunc {
  return func(c echo.Context) error {
    pollID := c.Param("id")    
    var poll models.Poll

    if err := db.DB.Preload("Responses").Where("id = ?", pollID).First(&poll).Error; err != nil {
      if err == gorm.ErrRecordNotFound {
        return c.JSON(http.StatusNotFound, map[string]string{"error": "Poll not found"})
      }
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve the poll"})
    }

    // Get session and check if user has already voted (if vote limiting is enabled)
    sessionID, err := session.GetOrCreateSession(c)
    if err != nil {
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Session error"})
    }

    // Check if user has already voted on this poll
    hasVoted := false
    if poll.LimitVotes {
      var voteRecord models.VoteRecord
      err := db.DB.Where("poll_id = ? AND session_id = ?", pollID, sessionID).First(&voteRecord).Error
      if err != nil && err != gorm.ErrRecordNotFound {
        return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error checking vote status"})
      }
      hasVoted = (err == nil)
    }

    // Create response with vote status and expiration status
    response := map[string]interface{}{
      "poll":       poll,
      "has_voted":  hasVoted,
      "is_expired": poll.IsExpired(),
    }

    return c.JSON(http.StatusOK, response)
  }
}


func VoteHandler() echo.HandlerFunc {
  return func(c echo.Context) error {
    pollID := c.Param("id")
    var voteRequest struct {
      ResponseID uint `json:"response_id"`
    }

    if err := c.Bind(&voteRequest); err != nil {
      return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
    }

    // Convert pollID to uint
    pollIDUint, err := strconv.ParseUint(pollID, 10, 32)
    if err != nil {
      return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid poll ID"})
    }

    // Get the poll to check if vote limiting is enabled and if poll is expired
    var poll models.Poll
    if err := db.DB.Where("id = ?", pollID).First(&poll).Error; err != nil {
      if err == gorm.ErrRecordNotFound {
        return c.JSON(http.StatusNotFound, map[string]string{"error": "Poll not found"})
      }
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve the poll"})
    }

    // Check if poll has expired
    if poll.IsExpired() {
      return c.JSON(http.StatusForbidden, map[string]string{"error": "This poll has expired and is no longer accepting votes"})
    }

    // Get or create session
    sessionID, err := session.GetOrCreateSession(c)
    if err != nil {
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Session error"})
    }

    // Check if vote limiting is enabled and user has already voted
    if poll.LimitVotes {
      var existingVote models.VoteRecord
      if err := db.DB.Where("poll_id = ? AND session_id = ?", pollID, sessionID).First(&existingVote).Error; err == nil {
        return c.JSON(http.StatusConflict, map[string]string{"error": "You have already voted on this poll"})
      }
    }

    // Verify the response belongs to this poll
    var pollResponse models.PollResponse
    if err := db.DB.Where("id = ? AND poll_id = ?", voteRequest.ResponseID, pollID).First(&pollResponse).Error; err != nil {
      if err == gorm.ErrRecordNotFound {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid response ID"})
      }
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to validate response"})
    }

    // Start transaction
    tx := db.DB.Begin()
    defer func() {
      if r := recover(); r != nil {
        tx.Rollback()
      }
    }()

    // Increment vote count
    if err := tx.Model(&models.PollResponse{}).Where("id = ?", voteRequest.ResponseID).Update("votes", gorm.Expr("votes + 1")).Error; err != nil {
      tx.Rollback()
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to register the vote"})
    }

    // Record the vote if limiting is enabled
    if poll.LimitVotes {
      voteRecord := models.VoteRecord{
        PollID:    uint(pollIDUint),
        SessionID: sessionID,
      }
      if err := tx.Create(&voteRecord).Error; err != nil {
        tx.Rollback()
        return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to record vote"})
      }
    }

    // Commit transaction
    if err := tx.Commit().Error; err != nil {
      return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to complete vote"})
    }

    return c.JSON(http.StatusOK, map[string]string{"message": "Thanks for voting"})
  }
}

// validatePoll validates poll data before saving
func validatePoll(poll *models.Poll) error {
	// Check if question is empty or just whitespace
	if strings.TrimSpace(poll.Question) == "" {
		return errors.New("Poll question cannot be empty")
	}

	// Check if poll has at least 2 responses
	if len(poll.Responses) < 2 {
		return errors.New("Poll must have at least 2 response options")
	}

	// Validate each response
	validResponses := 0
	for _, response := range poll.Responses {
		if strings.TrimSpace(response.Text) != "" {
			validResponses++
		}
	}

	if validResponses < 2 {
		return errors.New("Poll must have at least 2 non-empty response options")
	}

	return nil
}
