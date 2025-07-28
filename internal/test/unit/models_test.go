package unit

import (
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"poller-bear/internal/models"
	"poller-bear/internal/test/helpers"
)

var _ = Describe("Models Unit Tests", func() {

	Describe("Poll Model", func() {
		Context("when creating a new poll", func() {
			It("should have default values", func() {
				poll := &models.Poll{
					Question: "Test question?",
				}

				Expect(poll.Question).To(Equal("Test question?"))
				Expect(poll.LimitVotes).To(BeFalse()) // Default should be false
				Expect(poll.ExpiresAt).To(BeNil()) // Default should be nil (no expiration)
				Expect(poll.ID).To(BeZero())
				Expect(poll.Responses).To(BeEmpty())
			})

			It("should allow vote limiting to be enabled", func() {
				poll := &models.Poll{
					Question:   "Test question?",
					LimitVotes: true,
				}

				Expect(poll.LimitVotes).To(BeTrue())
			})

			It("should allow expiration time to be set", func() {
				futureTime := time.Now().Add(24 * time.Hour)
				poll := &models.Poll{
					Question:  "Test question?",
					ExpiresAt: &futureTime,
				}

				Expect(poll.ExpiresAt).NotTo(BeNil())
				Expect(*poll.ExpiresAt).To(BeTemporally("~", futureTime, time.Second))
			})
		})

		Context("when checking expiration", func() {
			It("should not be expired when ExpiresAt is nil", func() {
				poll := &models.Poll{
					Question:  "Test question?",
					ExpiresAt: nil,
				}

				Expect(poll.IsExpired()).To(BeFalse())
			})

			It("should not be expired when ExpiresAt is in the future", func() {
				futureTime := time.Now().Add(1 * time.Hour)
				poll := &models.Poll{
					Question:  "Test question?",
					ExpiresAt: &futureTime,
				}

				Expect(poll.IsExpired()).To(BeFalse())
			})

			It("should be expired when ExpiresAt is in the past", func() {
				pastTime := time.Now().Add(-1 * time.Hour)
				poll := &models.Poll{
					Question:  "Test question?",
					ExpiresAt: &pastTime,
				}

				Expect(poll.IsExpired()).To(BeTrue())
			})

			It("should be expired when ExpiresAt is exactly now", func() {
				now := time.Now().Add(-1 * time.Millisecond) // Slightly in the past to ensure it's expired
				poll := &models.Poll{
					Question:  "Test question?",
					ExpiresAt: &now,
				}

				Expect(poll.IsExpired()).To(BeTrue())
			})
		})

		Context("when creating with responses", func() {
			It("should properly associate responses", func() {
				poll := &models.Poll{
					Question: "Test question?",
					Responses: []models.PollResponse{
						{Text: "Option 1"},
						{Text: "Option 2"},
					},
				}

				Expect(poll.Responses).To(HaveLen(2))
				Expect(poll.Responses[0].Text).To(Equal("Option 1"))
				Expect(poll.Responses[1].Text).To(Equal("Option 2"))
			})
		})
	})

	Describe("PollResponse Model", func() {
		Context("when creating a poll response", func() {
			It("should have default values", func() {
				response := &models.PollResponse{
					Text:   "Sample response",
					PollID: 1,
				}

				Expect(response.Text).To(Equal("Sample response"))
				Expect(response.Votes).To(BeZero()) // Default should be 0
				Expect(response.PollID).To(Equal(uint(1)))
			})

			It("should allow vote count to be set", func() {
				response := &models.PollResponse{
					Text:   "Sample response",
					PollID: 1,
					Votes:  5,
				}

				Expect(response.Votes).To(Equal(uint(5)))
			})
		})
	})

	Describe("VoteRecord Model", func() {
		Context("when creating a vote record", func() {
			It("should store session ID and poll ID", func() {
				record := &models.VoteRecord{
					PollID:    1,
					SessionID: "session-123-abc",
				}

				Expect(record.PollID).To(Equal(uint(1)))
				Expect(record.SessionID).To(Equal("session-123-abc"))
				Expect(record.ID).To(BeZero())
			})

			It("should have timestamps when created", func() {
				now := time.Now()
				record := &models.VoteRecord{
					PollID:    1,
					SessionID: "session-123-abc",
					CreatedAt: now,
					UpdatedAt: now,
				}

				Expect(record.CreatedAt).To(BeTemporally("~", now, time.Second))
				Expect(record.UpdatedAt).To(BeTemporally("~", now, time.Second))
			})
		})

		Context("when validating session ID format", func() {
			It("should accept various session ID formats", func() {
				validSessionIDs := []string{
					"abc123",
					"session-456-def",
					"1234567890abcdef1234567890abcdef12345678",
					"user_session_2024",
				}

				for _, sessionID := range validSessionIDs {
					record := &models.VoteRecord{
						PollID:    1,
						SessionID: sessionID,
					}
					Expect(record.SessionID).To(Equal(sessionID))
				}
			})
		})
	})

	Describe("Test Builders", func() {
		Context("PollBuilder", func() {
			It("should create poll with default values", func() {
				poll := helpers.NewPollBuilder().Build()

				Expect(poll.Question).To(Equal("Test Question?"))
				Expect(poll.LimitVotes).To(BeFalse())
				Expect(poll.Responses).To(BeEmpty())
			})

			It("should create poll with custom values", func() {
				poll := helpers.NewPollBuilder().
					WithQuestion("Custom question?").
					WithVoteLimit(true).
					WithResponses([]string{"Option A", "Option B"}).
					Build()

				Expect(poll.Question).To(Equal("Custom question?"))
				Expect(poll.LimitVotes).To(BeTrue())
				Expect(poll.Responses).To(HaveLen(2))
				Expect(poll.Responses[0].Text).To(Equal("Option A"))
				Expect(poll.Responses[1].Text).To(Equal("Option B"))
			})

			It("should support method chaining", func() {
				poll := helpers.NewPollBuilder().
					WithQuestion("Chained question?").
					WithVoteLimit(true).
					WithResponses([]string{"Yes", "No", "Maybe"}).
					WithQuestion("Updated question?"). // Should override previous
					Build()

				Expect(poll.Question).To(Equal("Updated question?"))
				Expect(poll.LimitVotes).To(BeTrue())
				Expect(poll.Responses).To(HaveLen(3))
			})
		})

		Context("VoteRecordBuilder", func() {
			It("should create vote record with default values", func() {
				record := helpers.NewVoteRecordBuilder().Build()

				Expect(record.SessionID).To(Equal("test-session-123"))
				Expect(record.PollID).To(BeZero())
			})

			It("should create vote record with custom values", func() {
				record := helpers.NewVoteRecordBuilder().
					WithPollID(42).
					WithSessionID("custom-session-id").
					Build()

				Expect(record.PollID).To(Equal(uint(42)))
				Expect(record.SessionID).To(Equal("custom-session-id"))
			})

			It("should support method chaining", func() {
				record := helpers.NewVoteRecordBuilder().
					WithPollID(1).
					WithSessionID("session-1").
					WithPollID(2). // Should override
					Build()

				Expect(record.PollID).To(Equal(uint(2)))
				Expect(record.SessionID).To(Equal("session-1"))
			})
		})
	})

	Describe("Model Relationships", func() {
		It("should properly structure poll with responses", func() {
			poll := helpers.NewPollBuilder().
				WithQuestion("What's your favorite color?").
				WithResponses([]string{"Red", "Green", "Blue", "Yellow"}).
				Build()

			Expect(poll.Question).To(Equal("What's your favorite color?"))
			Expect(poll.Responses).To(HaveLen(4))
			
			for i, expectedColor := range []string{"Red", "Green", "Blue", "Yellow"} {
				Expect(poll.Responses[i].Text).To(Equal(expectedColor))
				Expect(poll.Responses[i].Votes).To(BeZero())
			}
		})
	})
})