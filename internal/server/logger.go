package server

import (
	"log"
	"os"
)

type Logger struct {
	Info  *log.Logger
	Error *log.Logger
	Fatal *log.Logger
}

func NewLogger() *Logger {
	return &Logger{
		Info:  log.New(os.Stdout, "info: ", log.LstdFlags),
		Error: log.New(os.Stderr, "error: ", log.LstdFlags),
		Fatal: log.New(os.Stderr, "fatal: ", log.LstdFlags),
	}
}
