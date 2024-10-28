package server

import "github.com/joaoprocopio/rqsturdy/internal/database"

type Config struct {
	Host     string
	Port     string
	Database *database.Config
}
