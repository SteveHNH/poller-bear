package config

import (
  "fmt"
  "strings"

  "github.com/spf13/viper"
)

const (
  DATABASE_IMPL = "Database_Impl"
  DATABASE_HOST = "Database_Host"
  DATABASE_PORT = "Database_Port"
  DATABASE_USER = "Database_User"
  DATABASE_PASS = "Database_Pass"
  DATABASE_NAME = "Database_Name"
)

type Config struct {
  DatabaseImpl string
  DatabaseHost string
  DatabasePort int 
  DatabaseUser string
  DatabasePass string
  DatabaseName string
}

func (c Config) String() string {
  var b strings.Builder
  fmt.Fprintf(&b, "%s: %s\n", DATABASE_IMPL, c.DatabaseImpl)
  fmt.Fprintf(&b, "%s: %s\n", DATABASE_HOST, c.DatabaseHost)
  fmt.Fprintf(&b, "%s: %d\n", DATABASE_PORT, c.DatabasePort)
  fmt.Fprintf(&b, "%s: %s\n", DATABASE_USER, c.DatabaseUser)
  fmt.Fprintf(&b, "%s: %s\n", DATABASE_PASS, c.DatabasePass)
  fmt.Fprintf(&b, "%s: %s\n", DATABASE_NAME, c.DatabaseName)
  return b.String()
}

func GetConfig() *Config {
  options := viper.New()

  options.SetDefault(DATABASE_IMPL, "postgres")
  options.SetDefault(DATABASE_HOST, "localhost")
  options.SetDefault(DATABASE_PORT, 5432)
  options.SetDefault(DATABASE_USER, "poller")
  options.SetDefault(DATABASE_PASS, "poller")
  options.SetDefault(DATABASE_NAME, "poller_bear")
  options.AutomaticEnv()

  config := &Config{
    DatabaseImpl: options.GetString(DATABASE_IMPL),
    DatabaseHost: options.GetString(DATABASE_HOST),
    DatabasePort: options.GetInt(DATABASE_PORT),
    DatabaseUser: options.GetString(DATABASE_USER),
    DatabasePass: options.GetString(DATABASE_PASS),
    DatabaseName: options.GetString(DATABASE_NAME),
  }

  return config
}
