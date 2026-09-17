package helpers

import (
	"poller-bear/internal/youtube"
)

// FakeOEmbedFetcher is a test double for youtube.OEmbedFetcher. By default it
// returns a canned successful result derived from the video ID; set Err to
// simulate a failure (e.g. youtube.ErrOEmbedUnavailable), or Result to control
// the returned metadata.
type FakeOEmbedFetcher struct {
	Result *youtube.OEmbedResult
	Err    error
}

// NewFakeOEmbedFetcher creates a fetcher test double with default canned success behavior.
func NewFakeOEmbedFetcher() *FakeOEmbedFetcher {
	return &FakeOEmbedFetcher{}
}

func (f *FakeOEmbedFetcher) Fetch(videoID string) (*youtube.OEmbedResult, error) {
	if f.Err != nil {
		return nil, f.Err
	}
	if f.Result != nil {
		return f.Result, nil
	}
	return &youtube.OEmbedResult{
		Title:        "Test Video " + videoID,
		ThumbnailURL: "https://img.youtube.com/vi/" + videoID + "/0.jpg",
	}, nil
}
