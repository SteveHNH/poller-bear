package test

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func TestPollerBear(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Poller Bear Test Suite")
}