package integration

import (
	"net/http"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"gorm.io/gorm"

	"poller-bear/internal/test/helpers"
)

var _ = Describe("Frontend Error Handling Integration Tests", func() {
	var (
		db         *gorm.DB
		testServer *helpers.TestServer
	)

	BeforeEach(func() {
		// Use the existing database setup
		db = helpers.TestDB
		helpers.CleanupTestData()
		testServer = helpers.NewTestServer(db)
	})

	AfterEach(func() {
		testServer.Close()
	})

	Describe("Poll Creation Validation Errors", func() {
		Context("when submitting invalid poll data", func() {
			It("should return validation error for empty question", func() {
				resp, err := testServer.CreatePoll(
					"", // Empty question
					false,
					[]string{"Option 1", "Option 2"},
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))

				// Parse error response
				var errorResponse map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &errorResponse)
				Expect(err).NotTo(HaveOccurred())
				
				Expect(errorResponse["error"]).To(ContainSubstring("Poll question cannot be empty"))
			})

			It("should return validation error for whitespace-only question", func() {
				resp, err := testServer.CreatePoll(
					"   \t\n   ", // Whitespace-only question
					false,
					[]string{"Option 1", "Option 2"},
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))

				var errorResponse map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &errorResponse)
				Expect(err).NotTo(HaveOccurred())
				
				Expect(errorResponse["error"]).To(ContainSubstring("Poll question cannot be empty"))
			})

			It("should return validation error for too few options", func() {
				resp, err := testServer.CreatePoll(
					"Valid question?",
					false,
					[]string{"Only one option"},
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))

				var errorResponse map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &errorResponse)
				Expect(err).NotTo(HaveOccurred())
				
				Expect(errorResponse["error"]).To(ContainSubstring("Poll must have at least 2 response options"))
			})

			It("should return validation error for empty response options", func() {
				resp, err := testServer.CreatePoll(
					"Valid question?",
					false,
					[]string{"", "   ", "Valid option"}, // Two empty/whitespace options
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusBadRequest))

				var errorResponse map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &errorResponse)
				Expect(err).NotTo(HaveOccurred())
				
				Expect(errorResponse["error"]).To(ContainSubstring("Poll must have at least 2 non-empty response options"))
			})
		})

		Context("when submitting valid poll data", func() {
			It("should successfully create poll with minimal valid data", func() {
				resp, err := testServer.CreatePoll(
					"Simple question?",
					false,
					[]string{"Yes", "No"},
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var pollResponse map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &pollResponse)
				Expect(err).NotTo(HaveOccurred())
				
				Expect(pollResponse["question"]).To(Equal("Simple question?"))
				Expect(pollResponse["id"]).NotTo(BeZero())
			})

			It("should successfully create poll with whitespace in question (trimmed)", func() {
				resp, err := testServer.CreatePoll(
					"  Question with spaces  ",
					false,
					[]string{"Option 1", "Option 2"},
				)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var pollResponse map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &pollResponse)
				Expect(err).NotTo(HaveOccurred())
				
				Expect(pollResponse["question"]).To(Equal("  Question with spaces  "))
			})
		})
	})

	Describe("Poll Retrieval Error Handling", func() {
		Context("when requesting non-existent poll", func() {
			It("should return 404 with meaningful error", func() {
				resp, err := testServer.GetPoll(99999)

				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusNotFound))

				var errorResponse map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &errorResponse)
				Expect(err).NotTo(HaveOccurred())
				
				Expect(errorResponse["error"]).To(ContainSubstring("Poll not found"))
			})
		})

		Context("when requesting valid poll", func() {
			It("should return poll data with proper structure", func() {
				// First create a poll
				createResp, err := testServer.CreatePoll(
					"Test question?",
					true, // Enable vote limiting
					[]string{"A", "B", "C"},
				)
				Expect(err).NotTo(HaveOccurred())

				var createdPoll map[string]interface{}
				err = helpers.ParseJSONResponse(createResp, &createdPoll)
				Expect(err).NotTo(HaveOccurred())

				pollID := uint(createdPoll["id"].(float64))

				// Then retrieve it
				resp, err := testServer.GetPoll(pollID)
				Expect(err).NotTo(HaveOccurred())
				Expect(resp.StatusCode).To(Equal(http.StatusOK))

				var response map[string]interface{}
				err = helpers.ParseJSONResponse(resp, &response)
				Expect(err).NotTo(HaveOccurred())
				
				// Should have new format with poll and has_voted
				Expect(response).To(HaveKey("poll"))
				Expect(response).To(HaveKey("has_voted"))
				
				pollData := response["poll"].(map[string]interface{})
				Expect(pollData["question"]).To(Equal("Test question?"))
				Expect(pollData["limit_votes"]).To(BeTrue())
				Expect(response["has_voted"]).To(BeFalse())
			})
		})
	})
})