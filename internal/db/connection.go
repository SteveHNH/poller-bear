package db

import (
  "fmt"

  "poller-bear/internal/config"

  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

var DB *gorm.DB

func initializePostgresConnection(cfg *config.Config) (*gorm.DB, error) {
  psqlConnectionInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s",
    cfg.DatabaseHost,
    cfg.DatabasePort,
    cfg.DatabaseUser,
    cfg.DatabasePass,
    cfg.DatabaseName,
  )

  db, err := gorm.Open(postgres.Open(psqlConnectionInfo), &gorm.Config{})
  if err != nil {
    return nil, err
  }
  return db, nil
}

func InitializeDatabaseConnection(cfg *config.Config) {

  var err error

  if cfg.DatabaseImpl == "postgres" {
    DB, err = initializePostgresConnection(cfg)
    if err != nil {
      panic(fmt.Sprintf("Unable to connect to database: %v", err))
    }
    fmt.Println("Connected to DB")
  } else {
    panic("Invalid database impl requested")
  }
} 
