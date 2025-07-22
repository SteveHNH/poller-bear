package unit

import (
	"net/http"
	"net/http/httptest"
	"regexp"

	"github.com/labstack/echo/v4"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"poller-bear/internal/session"
)

var _ = Describe("Session Management", func() {
	var (
		e *echo.Echo
		c echo.Context
		req *http.Request
		rec *httptest.ResponseRecorder
	)

	BeforeEach(func() {
		e = echo.New()
		req = httptest.NewRequest(http.MethodGet, "/", nil)
		rec = httptest.NewRecorder()
		c = e.NewContext(req, rec)
	})

	Describe("GetOrCreateSession", func() {
		Context("when no session cookie exists", func() {
			It("should create a new session", func() {
				sessionID, err := session.GetOrCreateSession(c)

				Expect(err).NotTo(HaveOccurred())
				Expect(sessionID).NotTo(BeEmpty())
				Expect(sessionID).To(HaveLen(64)) // 32 bytes hex encoded = 64 chars
			})

			It("should set session cookie in response", func() {
				_, err := session.GetOrCreateSession(c)

				Expect(err).NotTo(HaveOccurred())
				
				cookies := rec.Result().Cookies()
				Expect(cookies).To(HaveLen(1))
				
				cookie := cookies[0]
				Expect(cookie.Name).To(Equal("poller_session"))
				Expect(cookie.Value).NotTo(BeEmpty())
				Expect(cookie.HttpOnly).To(BeTrue())
				Expect(cookie.Path).To(Equal("/"))
				Expect(cookie.MaxAge).To(Equal(86400 * 30)) // 30 days
			})

			It("should create different session IDs for each call", func() {
				// Reset for first call
				req1 := httptest.NewRequest(http.MethodGet, "/", nil)
				rec1 := httptest.NewRecorder()
				c1 := e.NewContext(req1, rec1)
				
				sessionID1, err := session.GetOrCreateSession(c1)
				Expect(err).NotTo(HaveOccurred())

				// Reset for second call
				req2 := httptest.NewRequest(http.MethodGet, "/", nil)
				rec2 := httptest.NewRecorder()
				c2 := e.NewContext(req2, rec2)
				
				sessionID2, err := session.GetOrCreateSession(c2)
				Expect(err).NotTo(HaveOccurred())

				Expect(sessionID1).NotTo(Equal(sessionID2))
			})

			It("should generate valid hex session IDs", func() {
				sessionID, err := session.GetOrCreateSession(c)

				Expect(err).NotTo(HaveOccurred())
				// Check if sessionID is valid hexadecimal
				matched, err := regexp.MatchString("^[a-fA-F0-9]{64}$", sessionID)
				Expect(err).NotTo(HaveOccurred())
				Expect(matched).To(BeTrue())
			})
		})

		Context("when session cookie exists", func() {
			It("should return existing session ID", func() {
				existingSessionID := "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
				cookie := &http.Cookie{
					Name:  "poller_session",
					Value: existingSessionID,
				}
				req.AddCookie(cookie)
				
				sessionID, err := session.GetOrCreateSession(c)

				Expect(err).NotTo(HaveOccurred())
				Expect(sessionID).To(Equal(existingSessionID))
			})

			It("should not set a new cookie when one exists", func() {
				existingSessionID := "existing123456789existing123456789existing123456789existing12"
				cookie := &http.Cookie{
					Name:  "poller_session",
					Value: existingSessionID,
				}
				req.AddCookie(cookie)
				
				_, err := session.GetOrCreateSession(c)

				Expect(err).NotTo(HaveOccurred())
				
				// Should not set any new cookies
				cookies := rec.Result().Cookies()
				Expect(cookies).To(HaveLen(0))
			})
		})

		Context("when session cookie is empty", func() {
			It("should create new session for empty cookie value", func() {
				cookie := &http.Cookie{
					Name:  "poller_session",
					Value: "",
				}
				req.AddCookie(cookie)
				
				sessionID, err := session.GetOrCreateSession(c)

				Expect(err).NotTo(HaveOccurred())
				Expect(sessionID).NotTo(BeEmpty())
				Expect(sessionID).To(HaveLen(64))
				
				// Should set a new cookie
				cookies := rec.Result().Cookies()
				Expect(cookies).To(HaveLen(1))
			})
		})
	})

	Describe("Session Cookie Configuration", func() {
		It("should set secure cookie attributes", func() {
			_, err := session.GetOrCreateSession(c)
			Expect(err).NotTo(HaveOccurred())

			cookies := rec.Result().Cookies()
			cookie := cookies[0]

			By("setting HttpOnly flag")
			Expect(cookie.HttpOnly).To(BeTrue())

			By("setting correct path")
			Expect(cookie.Path).To(Equal("/"))

			By("setting SameSite to Lax")
			Expect(cookie.SameSite).To(Equal(http.SameSiteLaxMode))

			By("setting 30-day expiration")
			Expect(cookie.MaxAge).To(Equal(86400 * 30))
		})
	})
})