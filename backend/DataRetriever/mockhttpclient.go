package dataretriever

import "net/http"

type MockHttpClient struct {
	Response *http.Response
	Err      error
}

func (m *MockHttpClient) Get(url string) (*http.Response, error) {
	return m.Response, m.Err
}
