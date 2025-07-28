package models

import (
  "time"
)

type Poll struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	Question  string         `gorm:"type:varchar(512);not null" json:"question"`
	LimitVotes bool          `gorm:"default:false" json:"limit_votes"`
	ExpiresAt *time.Time     `json:"expires_at,omitempty"`
	Responses []PollResponse `gorm:"foreignKey:PollID" json:"responses"`
}

// IsExpired checks if the poll has expired
func (p *Poll) IsExpired() bool {
	if p.ExpiresAt == nil {
		return false
	}
	return time.Now().After(*p.ExpiresAt)
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
  ID         uint      `gorm:"primaryKey" json:"id"`
  CreatedAt  time.Time `json:"created_at"`
  UpdatedAt  time.Time `json:"updated_at"`
  PollID     uint      `gorm:"not null" json:"poll_id"`
  SessionID  string    `gorm:"type:varchar(128);not null" json:"session_id"`
}
