package db

import (
  "poller-bear/internal/models"
)

func Migrate() error {
  if err := DB.AutoMigrate(&models.Poll{}, &models.PollResponse{}, &models.VoteRecord{}); err != nil {
    return err
  }
  return nil
}
