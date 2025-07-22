package unit

import (
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"poller-bear/internal/models"
	"poller-bear/internal/test/helpers"
)

var _ = Describe("Input Validation Unit Tests", func() {

	Describe("Poll Validation", func() {
		Context("when creating polls with valid data", func() {
			It("should accept poll with proper question and responses", func() {
				poll := helpers.NewPollBuilder().
					WithQuestion("What's your favorite color?").
					WithResponses([]string{"Red", "Blue", "Green"}).
					Build()

				Expect(poll.Question).To(Equal("What's your favorite color?"))
				Expect(poll.Responses).To(HaveLen(3))
			})

			It("should accept poll with minimum responses", func() {
				poll := helpers.NewPollBuilder().
					WithQuestion("Simple question?").
					WithResponses([]string{"Yes", "No"}).
					Build()

				Expect(poll.Question).To(Equal("Simple question?"))
				Expect(poll.Responses).To(HaveLen(2))
			})
		})

		Context("when creating polls with edge cases", func() {
			It("should handle questions with whitespace correctly", func() {
				poll := &models.Poll{
					Question: "  Valid question with whitespace  ",
					Responses: []models.PollResponse{
						{Text: "Option 1"},
						{Text: "Option 2"},
					},
				}

				Expect(poll.Question).To(ContainSubstring("Valid question"))
			})

			It("should handle responses with varying lengths", func() {
				responses := []string{
					"Short",
					"This is a much longer response that tests the system's ability to handle varying lengths",
					"Medium length response",
					"A",
				}

				poll := helpers.NewPollBuilder().
					WithQuestion("Test question?").
					WithResponses(responses).
					Build()

				Expect(poll.Responses).To(HaveLen(4))
				for i, response := range poll.Responses {
					Expect(response.Text).To(Equal(responses[i]))
				}
			})
		})

		Context("when testing vote limiting flags", func() {
			It("should default to unlimited voting", func() {
				poll := helpers.NewPollBuilder().Build()
				Expect(poll.LimitVotes).To(BeFalse())
			})

			It("should allow enabling vote limiting", func() {
				poll := helpers.NewPollBuilder().
					WithVoteLimit(true).
					Build()
				Expect(poll.LimitVotes).To(BeTrue())
			})

			It("should allow toggling vote limiting", func() {
				poll := helpers.NewPollBuilder().
					WithVoteLimit(true).
					WithVoteLimit(false).
					Build()
				Expect(poll.LimitVotes).To(BeFalse())
			})
		})
	})

	Describe("Response Validation", func() {
		Context("when creating poll responses", func() {
			It("should initialize with zero votes", func() {
				response := &models.PollResponse{
					Text:   "Test response",
					PollID: 1,
				}

				Expect(response.Votes).To(BeZero())
				Expect(response.Text).To(Equal("Test response"))
				Expect(response.PollID).To(Equal(uint(1)))
			})

			It("should allow setting vote counts", func() {
				response := &models.PollResponse{
					Text:   "Popular response",
					PollID: 1,
					Votes:  42,
				}

				Expect(response.Votes).To(Equal(uint(42)))
			})
		})
	})

	Describe("Vote Record Validation", func() {
		Context("when creating vote records", func() {
			It("should associate with correct poll and session", func() {
				record := helpers.NewVoteRecordBuilder().
					WithPollID(123).
					WithSessionID("abc-def-456").
					Build()

				Expect(record.PollID).To(Equal(uint(123)))
				Expect(record.SessionID).To(Equal("abc-def-456"))
			})

			It("should handle various session ID formats", func() {
				sessionFormats := []string{
					"simple123",
					"uuid-like-format-1234-5678",
					"long-session-id-with-many-characters-and-numbers-123456789",
					"MixedCase123ABC",
				}

				for _, sessionID := range sessionFormats {
					record := helpers.NewVoteRecordBuilder().
						WithSessionID(sessionID).
						Build()
					Expect(record.SessionID).To(Equal(sessionID))
				}
			})
		})
	})
})