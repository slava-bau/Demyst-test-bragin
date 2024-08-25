package newserver

import (
	DataRetriever "demyst_backend/DataRetriever"
	handlers "demyst_backend/handlers"
	"fmt"
	"log"
	"net/http"
	"time"
)

func GetServer(retriever DataRetriever.DataRetriever, port string) *http.Server {
	mux := http.NewServeMux()
	mux.HandleFunc("/balance_sheet", func(w http.ResponseWriter, r *http.Request) {
		handlers.HandleBalanceSheet(w, retriever)
	})

	return &http.Server{
		Addr:         fmt.Sprintf(":%s", port),
		Handler:      loggingMiddleware(mux),
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Received request: %s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	})
}
