package server

type Config struct {
	Host     string
	Port     string
	Database *DatabaseConfig
}

type DatabaseConfig struct {
	Host     string
	Port     string
	Password string
	Name     string
}
