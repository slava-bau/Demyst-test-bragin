package main

import (
	"context"
	DataRetriever "demyst_backend/DataRetriever"
	NewServer "demyst_backend/NewServer"

	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
)

func main() {
	var retriever DataRetriever.DataRetriever
	jsonSource := os.Getenv("JSON_SOURCE")
	port := os.Getenv("PORT")
	apiURL := os.Getenv("API_URL")

	// TODO: file or DB retriever might be added

	switch jsonSource {
	case "api":
		retriever = &DataRetriever.ApiDataRetriever{
			URL:    apiURL,
			Client: &http.Client{},
		}
	// case "file":
	//	filePath := os.Getenv("JSON_PATH")
	// 	retriever = &DataRetriever.FileDataRetriever{FilePath: filePath}
	default:
		log.Fatalf("Unknown JSON jsonSource: %s", jsonSource)
	}

	server := NewServer.GetServer(retriever, port)

	log.Printf("Server is running on port %s\n", port)

	go func() {
		err := server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed {
			log.Fatalf("Could not start server: %v\n", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with a timeout of 5 seconds.
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := server.Shutdown(ctx)
	if err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exiting")
}
