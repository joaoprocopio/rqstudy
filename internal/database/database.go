package database

import (
	"context"
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func New(cfg *Config, ctx context.Context) (*sql.DB, error) {
	if db != nil {
		return db, nil
	}

	var err error

	db, err = sql.Open("sqlite3", cfg.URL)

	if err != nil {
		return nil, err
	}

	if err := db.PingContext(ctx); err != nil {
		return nil, err
	}

	return db, nil
}
