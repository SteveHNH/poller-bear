package youtube

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"time"
)

var (
	ErrOEmbedUnavailable = errors.New("video is unavailable")
	ErrOEmbedFetchFailed = errors.New("failed to fetch video metadata")
)

const oEmbedEndpoint = "https://www.youtube.com/oembed"

// OEmbedResult holds the metadata returned by YouTube's public oEmbed endpoint.
type OEmbedResult struct {
	Title        string `json:"title"`
	ThumbnailURL string `json:"thumbnail_url"`
}

// OEmbedFetcher fetches video metadata for a validated YouTube video ID.
type OEmbedFetcher interface {
	Fetch(videoID string) (*OEmbedResult, error)
}

type httpOEmbedFetcher struct {
	client   *http.Client
	endpoint string
}

// NewHTTPOEmbedFetcher returns an OEmbedFetcher backed by a real HTTP call to
// YouTube's public oEmbed endpoint, bounded by the given timeout.
func NewHTTPOEmbedFetcher(timeout time.Duration) OEmbedFetcher {
	return newHTTPOEmbedFetcher(timeout, oEmbedEndpoint)
}

// NewHTTPOEmbedFetcherForTesting is identical to NewHTTPOEmbedFetcher except it
// allows overriding the oEmbed endpoint, so tests can point it at a local
// httptest.Server instead of the real YouTube API. Not for production use.
func NewHTTPOEmbedFetcherForTesting(timeout time.Duration, endpoint string) OEmbedFetcher {
	return newHTTPOEmbedFetcher(timeout, endpoint)
}

func newHTTPOEmbedFetcher(timeout time.Duration, endpoint string) OEmbedFetcher {
	return &httpOEmbedFetcher{
		endpoint: endpoint,
		client: &http.Client{
			Timeout: timeout,
			CheckRedirect: func(req *http.Request, via []*http.Request) error {
				if !allowedHosts[req.URL.Host] {
					return errors.New("refusing to follow redirect to disallowed host")
				}
				return nil
			},
		},
	}
}

// Fetch never forwards the caller-supplied URL to the outbound request. The
// request target is always reconstructed from scratch using only the
// pre-validated 11-character video ID, so the outbound host/path is never
// attacker-controlled (this, not the host allowlist in ExtractVideoID, is what
// actually prevents SSRF here).
func (f *httpOEmbedFetcher) Fetch(videoID string) (*OEmbedResult, error) {
	canonicalURL := "https://www.youtube.com/watch?v=" + videoID
	requestURL := f.endpoint + "?format=json&url=" + url.QueryEscape(canonicalURL)

	resp, err := f.client.Get(requestURL)
	if err != nil {
		return nil, ErrOEmbedFetchFailed
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, ErrOEmbedUnavailable
	}

	var result OEmbedResult
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, ErrOEmbedFetchFailed
	}

	return &result, nil
}
