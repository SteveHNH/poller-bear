package session

import (
	"crypto/rand"
	"encoding/hex"
	"net/http"

	"github.com/labstack/echo/v4"
)

const SessionCookieName = "poller_session"

// GetOrCreateSession gets existing session ID from cookie or creates a new one
func GetOrCreateSession(c echo.Context) (string, error) {
	// Try to get existing session from cookie
	cookie, err := c.Cookie(SessionCookieName)
	if err == nil && cookie.Value != "" {
		return cookie.Value, nil
	}

	// Create new session ID
	sessionID, err := generateSessionID()
	if err != nil {
		return "", err
	}

	// Set session cookie
	cookie = &http.Cookie{
		Name:     SessionCookieName,
		Value:    sessionID,
		Path:     "/",
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		MaxAge:   86400 * 30, // 30 days
	}
	c.SetCookie(cookie)

	return sessionID, nil
}

// generateSessionID creates a random session ID
func generateSessionID() (string, error) {
	bytes := make([]byte, 32)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}