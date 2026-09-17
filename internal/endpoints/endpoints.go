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
	"poller-bear/internal/youtube"
)

const (
  MinPollDurationHours = 1
  MaxPollDurationHours = 8760 // 1 year
  MaxPollOptions       = 10
  MaxVideoTitleLength  = 256
)

func Home(c echo.Context) error {
  return c.String(http.StatusOK, "hello world!")
}

func CreatePollHandler() echo.HandlerFunc {
  return func(c echo.Context) error {
    var req struct {
      models.Poll
      DurationHours           *int `json:"duration_hours,omitempty"`
      SubmissionDurationHours *int `json:"submission_duration_hours,omitempty"`
    }

    if err := c.Bind(&req); err != nil {
      return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
    }

    poll := req.Poll

    if strings.TrimSpace(poll.Type) == "" {
      poll.Type = models.PollTypeStandard
    }

    // Set expiration time if duration is provided
    if req.DurationHours != nil {
      switch {
      case *req.DurationHours < 0:
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Duration hours cannot be negative"})
      case *req.DurationHours > MaxPollDurationHours:
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Duration cannot exceed 8760 hours (1 year)"})
      case *req.DurationHours >= MinPollDurationHours:
        expiresAt := time.Now().UTC().Add(time.Duration(*req.DurationHours) * time.Hour)
        poll.ExpiresAt = &expiresAt
      }
    }

    if poll.Type == models.PollTypeVideoCollab {
      if req.SubmissionDurationHours == nil {
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Submission duration hours is required for collaborative video polls"})
      }
      switch {
      case *req.SubmissionDurationHours < MinPollDurationHours:
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Submission duration must be at least 1 hour"})
      case *req.SubmissionDurationHours > MaxPollDurationHours:
        return c.JSON(http.StatusBadRequest, map[string]string{"error": "Submission duration cannot exceed 8760 hours (1 year)"})
      }
      submissionCloseAt := time.Now().UTC().Add(time.Duration(*req.SubmissionDurationHours) * time.Hour)
      poll.SubmissionCloseAt = &submissionCloseAt
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

    phase := poll.Phase()

    response := map[string]interface{}{
      "poll":       poll,
      "has_voted":  hasVoted,
      "is_expired": poll.IsExpired(),
      "phase":      phase,
    }

    if poll.Type == models.PollTypeVideoCollab {
      hasSubmitted := false
      var ownSubmission *models.PollResponse
      for i := range poll.Responses {
        if poll.Responses[i].SubmitterSessionID == sessionID {
          hasSubmitted = true
          ownSubmission = &poll.Responses[i]
          break
        }
      }

      response["has_submitted"] = hasSubmitted
      response["submission_count"] = len(poll.Responses)

      // Submissions are hidden from other participants until voting opens.
      if phase == models.PhaseSubmission {
        if ownSubmission != nil {
          poll.Responses = []models.PollResponse{*ownSubmission}
        } else {
          poll.Responses = []models.PollResponse{}
        }
        response["poll"] = poll
      }
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

    // Check the poll's current phase
    switch poll.Phase() {
    case models.PhaseSubmission:
      return c.JSON(http.StatusForbidden, map[string]string{"error": "Voting hasn't started yet — the submission window is still open"})
    case models.PhaseClosed:
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

	if poll.Type == models.PollTypeVideoCollab {
		return validateVideoCollabPoll(poll)
	}

	// Check if poll has at least 2 responses
	if len(poll.Responses) < 2 {
		return errors.New("Poll must have at least 2 response options")
	}

	// Check if poll has more than the maximum allowed responses
	if len(poll.Responses) > MaxPollOptions {
		return errors.New("Poll cannot have more than 10 response options")
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

// validateVideoCollabPoll validates a collaborative video poll before saving.
// Unlike standard polls, responses aren't supplied at creation time — they're
// added later via SubmitVideoHandler during the submission phase.
func validateVideoCollabPoll(poll *models.Poll) error {
	if len(poll.Responses) > 0 {
		return errors.New("Collaborative video polls cannot have predefined responses")
	}

	if poll.SubmissionCloseAt == nil {
		return errors.New("Submission close time is required for collaborative video polls")
	}

	if poll.ExpiresAt == nil {
		return errors.New("Voting close time is required for collaborative video polls")
	}

	if !poll.SubmissionCloseAt.Before(*poll.ExpiresAt) {
		return errors.New("Submission window must close before voting closes")
	}

	return nil
}

// NewSubmitVideoHandler accepts a YouTube video submission for a collaborative
// video poll during its submission phase. The fetcher is injected so tests can
// supply a fake instead of making a real network call.
func NewSubmitVideoHandler(fetcher youtube.OEmbedFetcher) echo.HandlerFunc {
	return func(c echo.Context) error {
		pollID := c.Param("id")

		var poll models.Poll
		if err := db.DB.Where("id = ?", pollID).First(&poll).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return c.JSON(http.StatusNotFound, map[string]string{"error": "Poll not found"})
			}
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to retrieve the poll"})
		}

		if poll.Type != models.PollTypeVideoCollab {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "This poll does not accept video submissions"})
		}

		if poll.Phase() != models.PhaseSubmission {
			return c.JSON(http.StatusForbidden, map[string]string{"error": "Submissions are closed for this poll"})
		}

		sessionID, err := session.GetOrCreateSession(c)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Session error"})
		}

		var existingSubmission models.PollResponse
		err = db.DB.Where("poll_id = ? AND submitter_session_id = ?", pollID, sessionID).First(&existingSubmission).Error
		if err != nil && err != gorm.ErrRecordNotFound {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Error checking submission status"})
		}
		if err == nil {
			return c.JSON(http.StatusConflict, map[string]string{"error": "You have already submitted a video to this poll"})
		}

		var req struct {
			VideoURL string `json:"video_url"`
		}
		if err := c.Bind(&req); err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
		}

		videoURL := strings.TrimSpace(req.VideoURL)
		if videoURL == "" {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Video URL cannot be empty"})
		}

		videoID, err := youtube.ExtractVideoID(videoURL)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Unsupported YouTube URL format"})
		}

		metadata, err := fetcher.Fetch(videoID)
		if err != nil {
			if err == youtube.ErrOEmbedUnavailable {
				return c.JSON(http.StatusUnprocessableEntity, map[string]string{"error": "This video is unavailable (it may be private or deleted)"})
			}
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to fetch video metadata"})
		}

		title := strings.TrimSpace(metadata.Title)
		if title == "" {
			title = videoID
		}
		if len(title) > MaxVideoTitleLength {
			title = title[:MaxVideoTitleLength]
		}

		pollIDUint, err := strconv.ParseUint(pollID, 10, 32)
		if err != nil {
			return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid poll ID"})
		}

		response := models.PollResponse{
			Text:               title,
			PollID:             uint(pollIDUint),
			VideoURL:           videoURL,
			VideoID:            videoID,
			ThumbnailURL:       metadata.ThumbnailURL,
			SubmitterSessionID: sessionID,
		}

		if err := db.DB.Create(&response).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save the submission"})
		}

		return c.JSON(http.StatusOK, response)
	}
}
