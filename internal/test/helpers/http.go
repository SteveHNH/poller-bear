package helpers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"

	"poller-bear/internal/db"
	"poller-bear/internal/endpoints"
)

// TestServer holds the test server and related components
type TestServer struct {
	Echo   *echo.Echo
	Server *httptest.Server
	Client *http.Client
	DB     *gorm.DB
}

// NewTestServer creates a new test server with the polling API routes
func NewTestServer(testDB *gorm.DB) *TestServer {
	// Set the global DB connection for the endpoints
	db.DB = testDB

	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Add API routes
	e.POST("/api/create", endpoints.CreatePollHandler())
	e.GET("/api/:id", endpoints.GetPollByIDHandler())
	e.POST("/api/:id/vote", endpoints.VoteHandler())

	server := httptest.NewServer(e)
	client := server.Client()

	return &TestServer{
		Echo:   e,
		Server: server,
		Client: client,
		DB:     testDB,
	}
}

// Close shuts down the test server
func (ts *TestServer) Close() {
	ts.Server.Close()
}

// URL returns the base URL of the test server
func (ts *TestServer) URL() string {
	return ts.Server.URL
}

// CreatePoll sends a POST request to create a new poll
func (ts *TestServer) CreatePoll(question string, limitVotes bool, responses []string) (*http.Response, error) {
	payload := map[string]interface{}{
		"question":    question,
		"limit_votes": limitVotes,
		"responses":   convertToResponseObjects(responses),
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	return ts.Client.Post(
		fmt.Sprintf("%s/api/create", ts.URL()),
		"application/json",
		bytes.NewBuffer(jsonData),
	)
}

// GetPoll sends a GET request to retrieve a poll by ID
func (ts *TestServer) GetPoll(pollID uint) (*http.Response, error) {
	return ts.Client.Get(fmt.Sprintf("%s/api/%d", ts.URL(), pollID))
}

// GetPollWithSession sends a GET request with a specific session cookie
func (ts *TestServer) GetPollWithSession(pollID uint, sessionCookie string) (*http.Response, error) {
	req, err := http.NewRequest("GET", fmt.Sprintf("%s/api/%d", ts.URL(), pollID), nil)
	if err != nil {
		return nil, err
	}

	// Add session cookie if provided
	if sessionCookie != "" {
		req.Header.Set("Cookie", fmt.Sprintf("poller_session=%s", sessionCookie))
	}

	return ts.Client.Do(req)
}

// Vote sends a POST request to vote on a poll
func (ts *TestServer) Vote(pollID uint, responseID uint) (*http.Response, error) {
	return ts.VoteWithSession(pollID, responseID, "")
}

// VoteWithSession sends a POST request to vote with a specific session cookie
func (ts *TestServer) VoteWithSession(pollID uint, responseID uint, sessionCookie string) (*http.Response, error) {
	payload := map[string]interface{}{
		"response_id": responseID,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", 
		fmt.Sprintf("%s/api/%d/vote", ts.URL(), pollID), 
		bytes.NewBuffer(jsonData))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	
	// Add session cookie if provided
	if sessionCookie != "" {
		req.Header.Set("Cookie", fmt.Sprintf("poller_session=%s", sessionCookie))
	}

	return ts.Client.Do(req)
}

// ParseJSONResponse parses a JSON response into the provided interface
func ParseJSONResponse(resp *http.Response, v interface{}) error {
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	return json.Unmarshal(body, v)
}

// GetResponseBody reads and returns the response body as string
func GetResponseBody(resp *http.Response) (string, error) {
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}

// ExtractSessionCookie extracts the session cookie from response headers
func ExtractSessionCookie(resp *http.Response) string {
	cookies := resp.Cookies()
	for _, cookie := range cookies {
		if cookie.Name == "poller_session" {
			return cookie.Value
		}
	}
	return ""
}

// convertToResponseObjects converts string slice to response objects
func convertToResponseObjects(responses []string) []map[string]string {
	result := make([]map[string]string, len(responses))
	for i, text := range responses {
		result[i] = map[string]string{"text": text}
	}
	return result
}