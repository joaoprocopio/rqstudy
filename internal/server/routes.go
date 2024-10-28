package server

import (
	"net/http"
)

func addRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/health", healthHandler)
}
