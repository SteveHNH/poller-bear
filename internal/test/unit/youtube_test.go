package unit

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"time"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"

	"poller-bear/internal/youtube"
)

var _ = Describe("YouTube Video ID Extraction", func() {
	DescribeTable("valid YouTube URLs",
		func(rawURL string, expectedID string) {
			id, err := youtube.ExtractVideoID(rawURL)
			Expect(err).NotTo(HaveOccurred())
			Expect(id).To(Equal(expectedID))
		},
		Entry("watch URL", "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"),
		Entry("watch URL with extra query params", "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PL123&t=30s", "dQw4w9WgXcQ"),
		Entry("bare youtube.com host", "https://youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"),
		Entry("mobile host", "https://m.youtube.com/watch?v=dQw4w9WgXcQ", "dQw4w9WgXcQ"),
		Entry("youtu.be short link", "https://youtu.be/dQw4w9WgXcQ", "dQw4w9WgXcQ"),
		Entry("youtu.be short link with query params", "https://youtu.be/dQw4w9WgXcQ?t=30", "dQw4w9WgXcQ"),
		Entry("shorts URL", "https://www.youtube.com/shorts/dQw4w9WgXcQ", "dQw4w9WgXcQ"),
	)

	DescribeTable("rejected URLs",
		func(rawURL string) {
			_, err := youtube.ExtractVideoID(rawURL)
			Expect(err).To(Equal(youtube.ErrUnsupportedURL))
		},
		Entry("host-bypass with a suffix-matching evil domain", "https://www.youtube.com.evil.com/watch?v=dQw4w9WgXcQ"),
		Entry("host-bypass with youtube.com in the query string", "https://evil.com/?www.youtube.com/watch?v=dQw4w9WgXcQ"),
		Entry("http scheme instead of https", "http://www.youtube.com/watch?v=dQw4w9WgXcQ"),
		Entry("malformed URL", "://not a url"),
		Entry("wrong-length video id", "https://www.youtube.com/watch?v=short"),
		Entry("unrelated video platform", "https://vimeo.com/12345678"),
		Entry("empty string", ""),
	)
})

var _ = Describe("YouTube oEmbed Fetcher", func() {
	var server *httptest.Server

	AfterEach(func() {
		if server != nil {
			server.Close()
			server = nil
		}
	})

	It("parses title and thumbnail from a successful response", func() {
		server = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]string{
				"title":         "Never Gonna Give You Up",
				"thumbnail_url": "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
			})
		}))

		fetcher := youtube.NewHTTPOEmbedFetcherForTesting(2*time.Second, server.URL)
		result, err := fetcher.Fetch("dQw4w9WgXcQ")

		Expect(err).NotTo(HaveOccurred())
		Expect(result.Title).To(Equal("Never Gonna Give You Up"))
		Expect(result.ThumbnailURL).To(Equal("https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"))
	})

	It("maps a non-200 response to ErrOEmbedUnavailable", func() {
		server = httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusNotFound)
		}))

		fetcher := youtube.NewHTTPOEmbedFetcherForTesting(2*time.Second, server.URL)
		_, err := fetcher.Fetch("dQw4w9WgXcQ")

		Expect(err).To(Equal(youtube.ErrOEmbedUnavailable))
	})

	It("maps a transport/timeout error to ErrOEmbedFetchFailed", func() {
		fetcher := youtube.NewHTTPOEmbedFetcherForTesting(50*time.Millisecond, "http://127.0.0.1:0")
		_, err := fetcher.Fetch("dQw4w9WgXcQ")

		Expect(err).To(Equal(youtube.ErrOEmbedFetchFailed))
	})
})
