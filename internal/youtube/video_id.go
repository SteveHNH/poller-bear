package youtube

import (
	"errors"
	"net/url"
	"regexp"
	"strings"
)

var ErrUnsupportedURL = errors.New("unsupported YouTube URL format")

var allowedHosts = map[string]bool{
	"youtube.com":     true,
	"www.youtube.com": true,
	"m.youtube.com":   true,
	"youtu.be":        true,
}

var videoIDPattern = regexp.MustCompile(`^[A-Za-z0-9_-]{11}$`)

// ExtractVideoID validates a submitted YouTube URL and extracts its 11-character
// video ID. Only https URLs on an exact-match allowlist of YouTube hosts are
// accepted (never substring/suffix matching, to avoid host-bypass tricks such as
// "www.youtube.com.evil.com").
func ExtractVideoID(rawURL string) (string, error) {
	u, err := url.Parse(strings.TrimSpace(rawURL))
	if err != nil {
		return "", ErrUnsupportedURL
	}

	if u.Scheme != "https" {
		return "", ErrUnsupportedURL
	}

	if !allowedHosts[u.Host] {
		return "", ErrUnsupportedURL
	}

	var candidate string
	switch {
	case u.Host == "youtu.be":
		candidate = strings.TrimPrefix(u.Path, "/")
	case u.Path == "/watch":
		candidate = u.Query().Get("v")
	case strings.HasPrefix(u.Path, "/shorts/"):
		candidate = strings.TrimPrefix(u.Path, "/shorts/")
	default:
		return "", ErrUnsupportedURL
	}

	// Strip any trailing path segments (e.g. youtu.be/<id>/extra).
	if idx := strings.Index(candidate, "/"); idx != -1 {
		candidate = candidate[:idx]
	}

	if !videoIDPattern.MatchString(candidate) {
		return "", ErrUnsupportedURL
	}

	return candidate, nil
}
