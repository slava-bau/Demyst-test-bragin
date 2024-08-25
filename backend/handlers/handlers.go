package handlers

import (
	DataRetriever "demyst_backend/DataRetriever"

	"encoding/json"
	"log"
	"net/http"
)

func HandleBalanceSheet(w http.ResponseWriter, retriever DataRetriever.DataRetriever) {
	body, err := retriever.GetData()
	if err != nil {
		errorText := "Failed to retrieve JSON data"
		http.Error(w, errorText, http.StatusInternalServerError)
		log.Printf("%s: %v\n", errorText, err)
		return
	}

	// TODO: implement E-Tag caching

	var jsonResponse map[string]interface{}
	err = json.Unmarshal(body, &jsonResponse)
	if err != nil {
		errorText := "Failed to unmarshal JSON response"
		http.Error(w, errorText, http.StatusInternalServerError)
		log.Printf("%s: %v\n", errorText, err)
		return
	}

	enableCORS(w)

	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(body)
	if err != nil {
		log.Printf("Failed to write response: %v\n", err)
	}
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	//w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}
