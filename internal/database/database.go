package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type Service interface {
	Health() error
}

var dbInstance *sql.DB

func New(config *Config) (*sql.DB, error) {
	if dbInstance != nil {
		return dbInstance, nil
	}

	var db *sql.DB
	var err error

	db, err = sql.Open("sqlite3", config.URL)

	if err != nil {
		return nil, err
	}

	dbInstance = db

	return db, nil
}
