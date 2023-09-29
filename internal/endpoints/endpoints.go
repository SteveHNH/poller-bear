package endpoints

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"

	"poller-bear/internal/db"
	"poller-bear/internal/models"
)


func Home(c echo.Context) error {
  return c.String(http.StatusOK, "hello world!")
}

func CreatePollHandler() echo.HandlerFunc {
  return func(c echo.Context) error {
    var poll models.Poll

    if err := c.Bind(&poll); err != nil {
      return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
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

    return c.JSON(http.StatusOK, poll)
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

    if err := db.DB.Model(&models.PollResponse{}).Where("id = ? AND poll_id = ?", voteRequest.ResponseID, pollID).Update("votes", gorm.Expr("votes + 1")).Error; err != nil {
			return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to register the vote"})
		}

    return c.JSON(http.StatusOK, map[string]string{"message": "Thanks for voting"})
  }
}
