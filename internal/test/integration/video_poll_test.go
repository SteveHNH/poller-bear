package integration

import (
	"net/http"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"gorm.io/gorm"

	"poller-bear/internal/models"
	"poller-bear/internal/test/helpers"
	"poller-bear/internal/youtube"
)

var _ = Describe("Collaborative Video Poll Integration Tests", func() {
	var (
		db         *gorm.DB
		testServer *helpers.TestServer
	)

	BeforeEach(func() {
		db = helpers.TestDB
		helpers.CleanupTestData()
		testServer = helpers.NewTestServer(db)
	})

	AfterEach(func() {
		testServer.Close()
	})

	Describe("POST /api/create for collaborative video polls", func() {
		Context("with valid data", func() {
			It("should create a collab poll with no predefined responses", func() {
				resp, err := testServer.CreateVideoCollabPoll("What should we listen to?", 1, 2)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var poll models.Poll
				err = helpers.ParseJSONResponse(resp, &poll)
				Expect(err).NotTo(HaveOccurred())

				Expect(poll.Type).To(Equal(models.PollTypeVideoCollab))
				Expect(poll.SubmissionCloseAt).NotTo(BeNil())
				Expect(poll.ExpiresAt).NotTo(BeNil())
				Expect(poll.SubmissionCloseAt.Before(*poll.ExpiresAt)).To(BeTrue())
				Expect(poll.Responses).To(BeEmpty())
			})
		})

		Context("with invalid data", func() {
			It("should reject a collab poll missing submission_duration_hours", func() {
				resp, err := testServer.CreatePollRaw(map[string]interface{}{
					"question":       "What should we listen to?",
					"type":           "video_collab",
					"duration_hours": 2,
				})

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))
			})

			It("should reject a collab poll with predefined responses", func() {
				resp, err := testServer.CreatePollRaw(map[string]interface{}{
					"question":                  "What should we listen to?",
					"type":                      "video_collab",
					"submission_duration_hours": 1,
					"duration_hours":            2,
					"responses":                 []map[string]string{{"text": "Not allowed"}},
				})

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))
			})

			It("should reject a submission window that closes after voting closes", func() {
				resp, err := testServer.CreateVideoCollabPoll("What should we listen to?", 3, 1)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))
			})
		})
	})

	Describe("POST /api/:id/submit", func() {
		var poll *models.Poll

		Context("during the submission phase", func() {
			BeforeEach(func() {
				poll = helpers.CreateVideoCollabPoll(db, 1*time.Hour, 2*time.Hour)
			})

			It("should accept a valid YouTube submission", func() {
				resp, err := testServer.SubmitVideo(poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ")

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var response models.PollResponse
				err = helpers.ParseJSONResponse(resp, &response)
				Expect(err).NotTo(HaveOccurred())

				Expect(response.VideoID).To(Equal("dQw4w9WgXcQ"))
				Expect(response.Text).To(Equal("Test Video dQw4w9WgXcQ"))
				Expect(response.ThumbnailURL).NotTo(BeEmpty())
				Expect(response.PollID).To(Equal(poll.ID))
			})

			It("should reject a second submission from the same session", func() {
				sessionCookie := "same-session-abc"

				firstResp, err := testServer.SubmitVideoWithSession(poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", sessionCookie)
				Expect(err).NotTo(HaveOccurred())
				Expect(firstResp.StatusCode).To(Equal(http.StatusOK))

				secondResp, err := testServer.SubmitVideoWithSession(poll.ID, "https://youtu.be/anotherID12", sessionCookie)
				Expect(err).NotTo(HaveOccurred())
				Expect(secondResp.StatusCode).To(Equal(http.StatusConflict))
			})

			It("should allow submissions from different sessions", func() {
				firstResp, err := testServer.SubmitVideoWithSession(poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "session-one")
				Expect(err).NotTo(HaveOccurred())
				Expect(firstResp.StatusCode).To(Equal(http.StatusOK))

				secondResp, err := testServer.SubmitVideoWithSession(poll.ID, "https://youtu.be/anotherID12", "session-two")
				Expect(err).NotTo(HaveOccurred())
				Expect(secondResp.StatusCode).To(Equal(http.StatusOK))
			})

			It("should reject a non-YouTube URL", func() {
				resp, err := testServer.SubmitVideo(poll.ID, "https://vimeo.com/12345678")

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))
			})

			It("should return 422 when the video is unavailable", func() {
				testServer.OEmbedFetcher.Err = youtube.ErrOEmbedUnavailable

				resp, err := testServer.SubmitVideo(poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ")

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusUnprocessableEntity))
			})
		})

		Context("outside the submission phase", func() {
			It("should reject submissions once voting has opened", func() {
				poll = helpers.CreateVideoCollabPoll(db, -1*time.Hour, 2*time.Hour)

				resp, err := testServer.SubmitVideo(poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ")

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusForbidden))
			})
		})

		Context("against a standard poll", func() {
			It("should reject the submission", func() {
				standardPoll := helpers.CreateSamplePoll(db)

				resp, err := testServer.SubmitVideo(standardPoll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ")

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))
			})
		})
	})

	Describe("Voting phase gating for collaborative video polls", func() {
		It("should reject votes while submissions are still open", func() {
			poll := helpers.CreateVideoCollabPoll(db, 1*time.Hour, 2*time.Hour)
			response := helpers.AddVideoSubmission(db, poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ", "", "Test Video", "some-session")

			resp, err := testServer.Vote(poll.ID, response.ID)

			Expect(err).NotTo(HaveOccurred())
			Expect(resp.StatusCode).To(Equal(http.StatusForbidden))
		})

		It("should accept votes once the voting phase has opened", func() {
			poll := helpers.CreateVideoCollabPoll(db, -1*time.Hour, 2*time.Hour)
			response := helpers.AddVideoSubmission(db, poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ", "", "Test Video", "some-session")

			resp, err := testServer.Vote(poll.ID, response.ID)

			Expect(err).NotTo(HaveOccurred())
			Expect(resp.StatusCode).To(Equal(http.StatusOK))
		})

		It("should reject votes once the poll has fully closed", func() {
			poll := helpers.CreateVideoCollabPoll(db, -2*time.Hour, -1*time.Hour)
			response := helpers.AddVideoSubmission(db, poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ", "", "Test Video", "some-session")

			resp, err := testServer.Vote(poll.ID, response.ID)

			Expect(err).NotTo(HaveOccurred())
			Expect(resp.StatusCode).To(Equal(http.StatusForbidden))
		})
	})

	Describe("GET /api/:id visibility across phases", func() {
		It("should only reveal the caller's own submission during the submission phase", func() {
			poll := helpers.CreateVideoCollabPoll(db, 1*time.Hour, 2*time.Hour)
			helpers.AddVideoSubmission(db, poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ", "", "Someone else's video", "other-session")

			submitResp, err := testServer.SubmitVideoWithSession(poll.ID, "https://youtu.be/myOwnVideo1", "my-session")
			Expect(err).NotTo(HaveOccurred())
			Expect(submitResp.StatusCode).To(Equal(http.StatusOK))

			resp, err := testServer.GetPollWithSession(poll.ID, "my-session")
			Expect(err).NotTo(HaveOccurred())
			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			var response map[string]interface{}
			err = helpers.ParseJSONResponse(resp, &response)
			Expect(err).NotTo(HaveOccurred())

			Expect(response["phase"]).To(Equal(models.PhaseSubmission))
			Expect(response["has_submitted"]).To(BeTrue())
			Expect(response["submission_count"]).To(Equal(float64(2)))

			pollData := response["poll"].(map[string]interface{})
			responses := pollData["responses"].([]interface{})
			Expect(responses).To(HaveLen(1))
			firstResponse := responses[0].(map[string]interface{})
			Expect(firstResponse["video_id"]).To(Equal("myOwnVideo1"))
		})

		It("should reveal all submissions once voting opens", func() {
			poll := helpers.CreateVideoCollabPoll(db, -1*time.Hour, 2*time.Hour)
			helpers.AddVideoSubmission(db, poll.ID, "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ", "", "Video A", "session-a")
			helpers.AddVideoSubmission(db, poll.ID, "https://youtu.be/videoB12345", "videoB12345", "", "Video B", "session-b")

			resp, err := testServer.GetPoll(poll.ID)
			Expect(err).NotTo(HaveOccurred())
			Expect(resp.StatusCode).To(Equal(http.StatusOK))

			var response map[string]interface{}
			err = helpers.ParseJSONResponse(resp, &response)
			Expect(err).NotTo(HaveOccurred())

			Expect(response["phase"]).To(Equal(models.PhaseVoting))
			pollData := response["poll"].(map[string]interface{})
			responses := pollData["responses"].([]interface{})
			Expect(responses).To(HaveLen(2))
		})
	})
})
