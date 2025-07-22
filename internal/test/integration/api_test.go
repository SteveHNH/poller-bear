package integration

import (
	"net/http"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"gorm.io/gorm"

	"poller-bear/internal/models"
	"poller-bear/internal/test/helpers"
)

var (
	db         *gorm.DB
	testServer *helpers.TestServer
)

var _ = BeforeSuite(func() {
	db = helpers.SetupTestDatabase()
})

var _ = AfterSuite(func() {
	helpers.TeardownTestDatabase()
})

var _ = Describe("Polling API Integration Tests", func() {
	BeforeEach(func() {
		helpers.CleanupTestData()
		testServer = helpers.NewTestServer(db)
	})

	AfterEach(func() {
		testServer.Close()
	})

	Describe("POST /api/create", func() {
		Context("with valid poll data", func() {
			It("should create a poll without vote limiting", func() {
				resp, err := testServer.CreatePoll(
					"What's your favorite framework?",
					false,
					[]string{"React", "Vue", "Angular", "Svelte"},
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var poll models.Poll
				err = helpers.ParseJSONResponse(resp, &poll)
				Expect(err).NotTo(HaveOccurred())

				Expect(poll.Question).To(Equal("What's your favorite framework?"))
				Expect(poll.LimitVotes).To(BeFalse())
				Expect(poll.Responses).To(HaveLen(4))
				Expect(poll.ID).NotTo(BeZero())

				// Verify it was saved to database
				var dbPoll models.Poll
				err = db.Preload("Responses").First(&dbPoll, poll.ID).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(dbPoll.Question).To(Equal(poll.Question))
			})

			It("should create a poll with vote limiting enabled", func() {
				resp, err := testServer.CreatePoll(
					"Should we limit votes?",
					true,
					[]string{"Yes", "No"},
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var poll models.Poll
				err = helpers.ParseJSONResponse(resp, &poll)
				Expect(err).NotTo(HaveOccurred())

				Expect(poll.Question).To(Equal("Should we limit votes?"))
				Expect(poll.LimitVotes).To(BeTrue())
				Expect(poll.Responses).To(HaveLen(2))
			})
		})

		Context("with invalid poll data", func() {
			It("should return error for empty question", func() {
				resp, err := testServer.CreatePoll(
					"",
					false,
					[]string{"Option 1", "Option 2"},
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))
			})
		})
	})

	Describe("GET /api/:id", func() {
		var poll *models.Poll

		BeforeEach(func() {
			poll = helpers.CreateSamplePoll(db)
		})

		Context("when poll exists", func() {
			It("should return poll data for unlimited voting poll", func() {
				resp, err := testServer.GetPoll(poll.ID)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var response map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &response)
				Expect(err).NotTo(HaveOccurred())

				pollData := response["poll"].(map[string]interface{})
				Expect(pollData["question"]).To(Equal(poll.Question))
				Expect(response["has_voted"]).To(BeFalse())
			})

			It("should return vote status for limited voting poll", func() {
				// Create a limited voting poll
				limitedPoll := helpers.CreateLimitedVotePoll(db)

				resp, err := testServer.GetPoll(limitedPoll.ID)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var response map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &response)
				Expect(err).NotTo(HaveOccurred())

				pollData := response["poll"].(map[string]interface{})
				Expect(pollData["limit_votes"]).To(BeTrue())
				Expect(response["has_voted"]).To(BeFalse())

				// Extract session cookie for subsequent requests
				sessionCookie := helpers.ExtractSessionCookie(resp)
				Expect(sessionCookie).NotTo(BeEmpty())
			})
		})

		Context("when poll does not exist", func() {
			It("should return 404", func() {
				resp, err := testServer.GetPoll(99999)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusNotFound))

				body, err := helpers.GetResponseBody(resp)
				Expect(err).NotTo(HaveOccurred())
				Expect(body).To(ContainSubstring("Poll not found"))
			})
		})
	})

	Describe("POST /api/:id/vote", func() {
		var poll *models.Poll

		BeforeEach(func() {
			poll = helpers.CreateSamplePoll(db)
		})

		Context("with unlimited voting poll", func() {
			It("should allow voting without session tracking", func() {
				responseID := poll.Responses[0].ID

				resp, err := testServer.Vote(poll.ID, responseID)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				// Verify vote was recorded
				var updatedResponse models.PollResponse
				err = db.First(&updatedResponse, responseID).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(updatedResponse.Votes).To(Equal(uint(1)))

				// Should not create vote record for unlimited polls
				var voteRecords []models.VoteRecord
				err = db.Where("poll_id = ?", poll.ID).Find(&voteRecords).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(voteRecords).To(BeEmpty())
			})

			It("should allow multiple votes from same session", func() {
				responseID := poll.Responses[0].ID

				// First vote
				resp1, err := testServer.Vote(poll.ID, responseID)
				Expect(err).NotTo(HaveOccurred())
				Expect(resp1.StatusCode).To(Equal(http.StatusOK))

				// Second vote should also succeed
				resp2, err := testServer.Vote(poll.ID, responseID)
				Expect(err).NotTo(HaveOccurred())
				Expect(resp2.StatusCode).To(Equal(http.StatusOK))

				// Verify vote count increased
				var updatedResponse models.PollResponse
				err = db.First(&updatedResponse, responseID).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(updatedResponse.Votes).To(Equal(uint(2)))
			})
		})

		Context("with limited voting poll", func() {
			var limitedPoll *models.Poll

			BeforeEach(func() {
				limitedPoll = helpers.CreateLimitedVotePoll(db)
			})

			It("should allow first vote and create vote record", func() {
				responseID := limitedPoll.Responses[0].ID

				resp, err := testServer.Vote(limitedPoll.ID, responseID)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				// Verify vote was recorded
				var updatedResponse models.PollResponse
				err = db.First(&updatedResponse, responseID).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(updatedResponse.Votes).To(Equal(uint(1)))

				// Should create vote record for limited polls
				var voteRecords []models.VoteRecord
				err = db.Where("poll_id = ?", limitedPoll.ID).Find(&voteRecords).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(voteRecords).To(HaveLen(1))
			})

			It("should prevent duplicate votes from same session", func() {
				responseID := limitedPoll.Responses[0].ID

				// Get session by first making a request that sets cookie
				getResp, err := testServer.GetPoll(limitedPoll.ID)
				Expect(err).NotTo(HaveOccurred())
				sessionCookie := helpers.ExtractSessionCookie(getResp)

				// First vote with session
				resp1, err := testServer.VoteWithSession(limitedPoll.ID, responseID, sessionCookie)
				Expect(err).NotTo(HaveOccurred())
				Expect(resp1.StatusCode).To(Equal(http.StatusOK))

				// Second vote with same session should fail
				resp2, err := testServer.VoteWithSession(limitedPoll.ID, responseID, sessionCookie)
				Expect(err).NotTo(HaveOccurred())
				Expect(resp2.StatusCode).To(Equal(http.StatusConflict))

				body, err := helpers.GetResponseBody(resp2)
				Expect(err).NotTo(HaveOccurred())
				Expect(body).To(ContainSubstring("already voted"))

				// Verify vote count didn't increase
				var updatedResponse models.PollResponse
				err = db.First(&updatedResponse, responseID).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(updatedResponse.Votes).To(Equal(uint(1))) // Still only 1
			})

			It("should allow votes from different sessions", func() {
				responseID := limitedPoll.Responses[0].ID

				// Vote with first session
				getResp1, err := testServer.GetPoll(limitedPoll.ID)
				Expect(err).NotTo(HaveOccurred())
				sessionCookie1 := helpers.ExtractSessionCookie(getResp1)

				resp1, err := testServer.VoteWithSession(limitedPoll.ID, responseID, sessionCookie1)
				Expect(err).NotTo(HaveOccurred())
				Expect(resp1.StatusCode).To(Equal(http.StatusOK))

				// Vote with second session (different session cookie)
				resp2, err := testServer.VoteWithSession(limitedPoll.ID, responseID, "different-session-id")
				Expect(err).NotTo(HaveOccurred())
				Expect(resp2.StatusCode).To(Equal(http.StatusOK))

				// Verify both votes were counted
				var updatedResponse models.PollResponse
				err = db.First(&updatedResponse, responseID).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(updatedResponse.Votes).To(Equal(uint(2)))

				// Should have two vote records
				var voteRecords []models.VoteRecord
				err = db.Where("poll_id = ?", limitedPoll.ID).Find(&voteRecords).Error
				Expect(err).NotTo(HaveOccurred())
				Expect(voteRecords).To(HaveLen(2))
			})
		})

		Context("with invalid data", func() {
			It("should return error for non-existent poll", func() {
				resp, err := testServer.Vote(99999, 1)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusNotFound))
			})

			It("should return error for non-existent response", func() {
				resp, err := testServer.Vote(poll.ID, 99999)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))

				body, err := helpers.GetResponseBody(resp)
				Expect(err).NotTo(HaveOccurred())
				Expect(body).To(ContainSubstring("Invalid response ID"))
			})

			It("should return error for response from different poll", func() {
				// Create another poll
				anotherPoll := helpers.CreateSamplePoll(db)
				
				// Try to vote on first poll using response from second poll
				resp, err := testServer.Vote(poll.ID, anotherPoll.Responses[0].ID)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))

				body, err := helpers.GetResponseBody(resp)
				Expect(err).NotTo(HaveOccurred())
				Expect(body).To(ContainSubstring("Invalid response ID"))
			})
		})
	})

	Describe("Complete Polling Workflow", func() {
		It("should handle the complete polling lifecycle", func() {
			By("Creating a new poll")
			createResp, err := testServer.CreatePoll(
				"What's your favorite programming language?",
				true, // Enable vote limiting
				[]string{"Go", "Python", "JavaScript", "Rust"},
			)
			Expect(err).NotTo(HaveOccurred())
			Expect(createResp.StatusCode).To(Equal(http.StatusOK))

			var poll models.Poll
			err = helpers.ParseJSONResponse(createResp, &poll)
			Expect(err).NotTo(HaveOccurred())

			By("Retrieving the poll")
			getResp, err := testServer.GetPoll(poll.ID)
			Expect(err).NotTo(HaveOccurred())
			Expect(getResp.StatusCode).To(Equal(http.StatusOK))

			sessionCookie := helpers.ExtractSessionCookie(getResp)

			By("Voting on the poll")
			voteResp, err := testServer.VoteWithSession(poll.ID, poll.Responses[0].ID, sessionCookie)
			Expect(err).NotTo(HaveOccurred())
			Expect(voteResp.StatusCode).To(Equal(http.StatusOK))

			By("Verifying the vote was recorded")
			var updatedResponse models.PollResponse
			err = db.First(&updatedResponse, poll.Responses[0].ID).Error
			Expect(err).NotTo(HaveOccurred())
			Expect(updatedResponse.Votes).To(Equal(uint(1)))

			By("Verifying duplicate vote is prevented")
			duplicateResp, err := testServer.VoteWithSession(poll.ID, poll.Responses[1].ID, sessionCookie)
			Expect(err).NotTo(HaveOccurred())
			Expect(duplicateResp.StatusCode).To(Equal(http.StatusConflict))

			By("Verifying poll shows user has voted")
			finalGetResp, err := testServer.GetPollWithSession(poll.ID, sessionCookie)
			Expect(err).NotTo(HaveOccurred())
			
			var finalResponse map[string]interface{}
			err = helpers.ParseJSONResponse(finalGetResp, &finalResponse)
			Expect(err).NotTo(HaveOccurred())
			Expect(finalResponse["has_voted"]).To(BeTrue())
		})
	})
})