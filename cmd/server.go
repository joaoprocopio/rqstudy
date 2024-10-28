package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"

	"github.com/joaoprocopio/rqsturdy/internal/database"
	"github.com/joaoprocopio/rqsturdy/internal/server"
)

func run(ctx context.Context, logger *server.Logger) error {
	ctx, cancel := signal.NotifyContext(ctx, syscall.SIGINT, syscall.SIGTERM)

	defer cancel()

	dbCfg := &database.Config{
		URL: "./db.sqlite",
	}
	srvCfg := &server.Config{
		Host: "localhost",
		Port: "8000",
	}

	db, err := database.New(dbCfg, ctx)

	if err != nil {
		return err
	}

	srv := server.NewServer(logger, srvCfg, db)

	go func() {
		logger.Info.Printf("listening on http://%s\n", srv.Addr)

		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			logger.Error.Printf("listening and serving: %s\n", err)
		}
	}()

	var wg sync.WaitGroup

	wg.Add(1)

	go func() {
		defer wg.Done()

		<-ctx.Done()

		if err := srv.Shutdown(ctx); err != nil {
			logger.Error.Printf("shutting down server: %s\n", err)
		}

		if err := db.Close(); err != nil {
			logger.Error.Printf("closing database: %s\n", err)
		}
	}()

	wg.Wait()

	return nil
}

func main() {
	ctx := context.Background()
	logger := server.NewLogger()

	if err := run(ctx, logger); err != nil {
		logger.Error.Printf("%s\n", err)
		os.Exit(1)
	}
}
