package models

import (
  "time"
)

type Poll struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	Question  string         `gorm:"type:varchar(512);not null" json:"question"`
	Responses []PollResponse `gorm:"foreignKey:PollID" json:"responses"`
}

type PollResponse struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Text      string    `gorm:"type:varchar(256);not null" json:"text"`
	Votes     uint      `gorm:"default:0" json:"votes"`
	PollID    uint      `json:"poll_id"`
}

type VoteRecord struct {
  ID uint `gorm:"primaryKey"`
  PollID uint `gorm:"foreignKey:PollID"`
  CookieUUID string `gorm:"type:varchar(36);not null"`
}
