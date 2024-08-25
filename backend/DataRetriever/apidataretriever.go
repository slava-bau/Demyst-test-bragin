package dataretriever

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
)

var (
	ErrorNotJSON         = errors.New("received not JSON")
	ErrorNotOKStatusCode = errors.New("received not OK HTTP status")
	ErrorEmptyURL        = errors.New("received empty URL")
)

type ApiDataRetriever struct {
	URL    string
	Client HttpClient
}

func (retriever *ApiDataRetriever) GetData() ([]byte, error) {
	response, err := retriever.fetchData()
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	var jsonResponse map[string]interface{}
	err = json.Unmarshal(body, &jsonResponse)
	if err != nil {
		return nil, ErrorNotJSON
	}

	return body, nil
}

func (retriever *ApiDataRetriever) fetchData() (*http.Response, error) {
	if retriever.URL == "" {
		return nil, ErrorEmptyURL
	}

	response, err := retriever.Client.Get(retriever.URL)
	if err != nil {
		return nil, err
	}

	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("%w: %d", ErrorNotOKStatusCode, response.StatusCode)
	}

	return response, nil
}
