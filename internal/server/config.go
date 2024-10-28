package server

import "rqsturdy/internal/database"

type Config struct {
	Host     string
	Port     string
	Database *database.Config
}
