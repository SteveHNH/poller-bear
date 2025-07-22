package helpers

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"poller-bear/internal/models"
)

var (
	TestDB     *gorm.DB
	testDBHost string
	testDBPort string
)

// SetupTestDatabase connects to the existing test database (assumes it's running on port 5433)
func SetupTestDatabase() *gorm.DB {
	var err error
	
	testDBHost = "localhost"
	testDBPort = "5433" // Use the podman-compose test database port

	// Direct connection to the test database
	dsn := fmt.Sprintf("host=%s port=%s user=test_user password=test_password dbname=poller_bear_test sslmode=disable", testDBHost, testDBPort)
	TestDB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Silent),
	})
	if err != nil {
		log.Fatalf("Could not connect to test database: %s", err)
	}

	// Test connection
	sqlDB, err := TestDB.DB()
	if err != nil {
		log.Fatalf("Could not get database instance: %s", err)
	}
	
	if err = sqlDB.Ping(); err != nil {
		log.Fatalf("Could not ping test database: %s", err)
	}

	// Run migrations
	err = TestDB.AutoMigrate(&models.Poll{}, &models.PollResponse{}, &models.VoteRecord{})
	if err != nil {
		log.Fatalf("Could not run migrations: %s", err)
	}

	fmt.Println("Connected to test database successfully")
	return TestDB
}

// TeardownTestDatabase closes the database connection (database container managed externally)
func TeardownTestDatabase() {
	if TestDB != nil {
		sqlDB, err := TestDB.DB()
		if err == nil {
			sqlDB.Close()
		}
	}
	fmt.Println("Test database connection closed")
}

// CleanupTestData removes all test data from database tables
func CleanupTestData() {
	if TestDB != nil {
		TestDB.Exec("TRUNCATE TABLE vote_records, poll_responses, polls RESTART IDENTITY CASCADE")
	}
}

// GetTestDBConnection returns the test database connection string
func GetTestDBConnection() string {
	return fmt.Sprintf("host=%s port=%s user=test_user password=test_password dbname=poller_bear_test sslmode=disable", testDBHost, testDBPort)
}