package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"

	"poller-bear/internal/config"
	"poller-bear/internal/db"
	"poller-bear/internal/endpoints"
)

func main() {
  cfg := config.GetConfig()
  db.InitializeDatabaseConnection(cfg) 

  if err := db.Migrate(); err != nil {
    panic("Failed to migrate database: " + err.Error())
  }

  e := echo.New()
  e.Use(middleware.Logger())
  e.Use(middleware.Recover())
  e.Static("/", "frontend/public/")
  e.POST("/api/create", endpoints.CreatePollHandler())
  e.GET("/api/:id", endpoints.GetPollByIDHandler())
  e.POST("/api/:id/vote", endpoints.VoteHandler())
  e.GET("/polls/*", func(c echo.Context) error {
    return c.File("frontend/public/index.html")
  })

  e.Logger.Fatal(e.Start(":8080"))
}
