package server

import (
	"net/http"
)

func newRequestLoggerMiddleware(h http.Handler, logger *Logger) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		logger.Info.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)

		h.ServeHTTP(w, r)
	})
}
