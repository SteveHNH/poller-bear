package models

import (
  "time"
)

const (
	PollTypeStandard    = "standard"
	PollTypeVideoCollab = "video_collab"
)

const (
	PhaseSubmission = "submission"
	PhaseVoting     = "voting"
	PhaseClosed     = "closed"
)

type Poll struct {
	ID                uint           `gorm:"primaryKey" json:"id"`
	CreatedAt         time.Time      `json:"created_at"`
	UpdatedAt         time.Time      `json:"updated_at"`
	Question          string         `gorm:"type:varchar(512);not null" json:"question"`
	LimitVotes        bool           `gorm:"default:false" json:"limit_votes"`
	ExpiresAt         *time.Time     `json:"expires_at,omitempty"`
	Type              string         `gorm:"type:varchar(32);not null;default:'standard'" json:"type"`
	SubmissionCloseAt *time.Time     `json:"submission_close_at,omitempty"`
	Responses         []PollResponse `gorm:"foreignKey:PollID" json:"responses"`
}

// IsExpired checks if the poll has expired
func (p *Poll) IsExpired() bool {
	if p.ExpiresAt == nil {
		return false
	}
	return time.Now().UTC().After(*p.ExpiresAt)
}

// Phase returns the current phase of the poll: submission, voting, or closed.
// Standard polls never have a SubmissionCloseAt, so they can only ever be in
// the voting or closed phase (matching their historical behavior).
func (p *Poll) Phase() string {
	now := time.Now().UTC()
	if p.Type == PollTypeVideoCollab && p.SubmissionCloseAt != nil && now.Before(*p.SubmissionCloseAt) {
		return PhaseSubmission
	}
	if !p.IsExpired() {
		return PhaseVoting
	}
	return PhaseClosed
}

type PollResponse struct {
	ID                  uint      `gorm:"primaryKey" json:"id"`
	CreatedAt           time.Time `json:"created_at"`
	UpdatedAt           time.Time `json:"updated_at"`
	Text                string    `gorm:"type:varchar(256);not null" json:"text"`
	Votes               uint      `gorm:"default:0" json:"votes"`
	PollID              uint      `json:"poll_id"`
	VideoURL            string    `gorm:"type:varchar(1024)" json:"video_url,omitempty"`
	VideoID             string    `gorm:"type:varchar(32)" json:"video_id,omitempty"`
	ThumbnailURL        string    `gorm:"type:varchar(1024)" json:"thumbnail_url,omitempty"`
	SubmitterSessionID  string    `gorm:"type:varchar(128)" json:"-"`
}

type VoteRecord struct {
  ID         uint      `gorm:"primaryKey" json:"id"`
  CreatedAt  time.Time `json:"created_at"`
  UpdatedAt  time.Time `json:"updated_at"`
  PollID     uint      `gorm:"not null" json:"poll_id"`
  SessionID  string    `gorm:"type:varchar(128);not null" json:"session_id"`
}
