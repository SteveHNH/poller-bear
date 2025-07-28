package helpers

import (
	"time"

	"gorm.io/gorm"
	"poller-bear/internal/models"
)

// PollBuilder helps create test polls with various configurations
type PollBuilder struct {
	poll *models.Poll
}

// NewPollBuilder creates a new poll builder with default values
func NewPollBuilder() *PollBuilder {
	return &PollBuilder{
		poll: &models.Poll{
			Question:   "Test Question?",
			LimitVotes: false,
			CreatedAt:  time.Now(),
			UpdatedAt:  time.Now(),
		},
	}
}

// WithQuestion sets the poll question
func (pb *PollBuilder) WithQuestion(question string) *PollBuilder {
	pb.poll.Question = question
	return pb
}

// WithVoteLimit enables or disables vote limiting
func (pb *PollBuilder) WithVoteLimit(limit bool) *PollBuilder {
	pb.poll.LimitVotes = limit
	return pb
}

// WithExpiresAt sets the poll expiration time
func (pb *PollBuilder) WithExpiresAt(expiresAt *time.Time) *PollBuilder {
	pb.poll.ExpiresAt = expiresAt
	return pb
}

// WithDuration sets the poll to expire after the specified duration from now
func (pb *PollBuilder) WithDuration(duration time.Duration) *PollBuilder {
	expiresAt := time.Now().Add(duration)
	pb.poll.ExpiresAt = &expiresAt
	return pb
}

// WithResponses adds poll response options
func (pb *PollBuilder) WithResponses(responses []string) *PollBuilder {
	pb.poll.Responses = make([]models.PollResponse, len(responses))
	for i, text := range responses {
		pb.poll.Responses[i] = models.PollResponse{
			Text:      text,
			Votes:     0,
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}
	}
	return pb
}

// Build creates the poll instance
func (pb *PollBuilder) Build() *models.Poll {
	return pb.poll
}

// Create saves the poll to the database and returns it
func (pb *PollBuilder) Create(db *gorm.DB) *models.Poll {
	db.Create(pb.poll)
	return pb.poll
}

// VoteRecordBuilder helps create test vote records
type VoteRecordBuilder struct {
	record *models.VoteRecord
}

// NewVoteRecordBuilder creates a new vote record builder
func NewVoteRecordBuilder() *VoteRecordBuilder {
	return &VoteRecordBuilder{
		record: &models.VoteRecord{
			SessionID: "test-session-123",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		},
	}
}

// WithPollID sets the poll ID for the vote record
func (vb *VoteRecordBuilder) WithPollID(pollID uint) *VoteRecordBuilder {
	vb.record.PollID = pollID
	return vb
}

// WithSessionID sets the session ID
func (vb *VoteRecordBuilder) WithSessionID(sessionID string) *VoteRecordBuilder {
	vb.record.SessionID = sessionID
	return vb
}

// Build creates the vote record instance
func (vb *VoteRecordBuilder) Build() *models.VoteRecord {
	return vb.record
}

// Create saves the vote record to the database and returns it
func (vb *VoteRecordBuilder) Create(db *gorm.DB) *models.VoteRecord {
	db.Create(vb.record)
	return vb.record
}

// CreateSamplePoll creates a standard test poll with responses
func CreateSamplePoll(db *gorm.DB) *models.Poll {
	return NewPollBuilder().
		WithQuestion("What's your favorite programming language?").
		WithResponses([]string{"Go", "Python", "JavaScript", "Rust"}).
		Create(db)
}

// CreateLimitedVotePoll creates a poll with vote limiting enabled
func CreateLimitedVotePoll(db *gorm.DB) *models.Poll {
	return NewPollBuilder().
		WithQuestion("Should we limit votes?").
		WithVoteLimit(true).
		WithResponses([]string{"Yes", "No"}).
		Create(db)
}

// CreateVoteRecord creates a vote record for the given poll and session
func CreateVoteRecord(db *gorm.DB, pollID uint, sessionID string) *models.VoteRecord {
	return NewVoteRecordBuilder().
		WithPollID(pollID).
		WithSessionID(sessionID).
		Create(db)
}

// CreatePollWithDuration creates a poll that expires after the specified duration
func CreatePollWithDuration(db *gorm.DB, duration time.Duration) *models.Poll {
	return NewPollBuilder().
		WithQuestion("Poll with duration").
		WithDuration(duration).
		WithResponses([]string{"Option 1", "Option 2"}).
		Create(db)
}

// CreateExpiredPoll creates a poll that has already expired
func CreateExpiredPoll(db *gorm.DB) *models.Poll {
	pastTime := time.Now().Add(-1 * time.Hour)
	return NewPollBuilder().
		WithQuestion("Expired poll").
		WithExpiresAt(&pastTime).
		WithResponses([]string{"Option 1", "Option 2"}).
		Create(db)
}

// CreateNonExpiringPoll creates a poll that never expires
func CreateNonExpiringPoll(db *gorm.DB) *models.Poll {
	return NewPollBuilder().
		WithQuestion("Poll that never expires").
		WithExpiresAt(nil).
		WithResponses([]string{"Option 1", "Option 2"}).
		Create(db)
}