package unit

import (
	"testing"

	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

func TestUnit(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Unit Test Suite")
}