package server

import (
	"database/sql"
	"net"
	"net/http"
	"time"
)

func NewServer(logger *Logger, cfg *Config, db *sql.DB) *http.Server {
	mux := http.NewServeMux()

	addRoutes(mux)

	var handler http.Handler = mux

	handler = newRequestLoggerMiddleware(handler, logger)

	srv := &http.Server{
		Addr:         net.JoinHostPort(cfg.Host, cfg.Port),
		Handler:      handler,
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
		ErrorLog:     logger.Error,
	}

	return srv
}
