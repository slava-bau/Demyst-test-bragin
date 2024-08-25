package dataretriever

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"testing"
)

func TestApiDataRetriever_GetData(t *testing.T) {
	exampleResponse := `{"key": "value"}`
	exampleURL := "http://example.com"

	tests := []struct {
		name          string
		URL           string
		mockClient    *MockHttpClient
		expectedText  string
		expectedError error
	}{
		{
			name: "Success",
			URL:  exampleURL,
			mockClient: &MockHttpClient{
				Response: &http.Response{
					StatusCode: http.StatusOK,
					Body:       io.NopCloser(bytes.NewBufferString(exampleResponse)),
				},
			},
			expectedText:  exampleResponse,
			expectedError: nil,
		},
		{
			name: "Not JSON",
			URL:  exampleURL,
			mockClient: &MockHttpClient{
				Response: &http.Response{
					StatusCode: http.StatusOK,
					Body:       io.NopCloser(bytes.NewBufferString("abcd")),
				},
			},
			expectedError: ErrorNotJSON,
		},
		{
			name: "Malformed JSON",
			URL:  exampleURL,
			mockClient: &MockHttpClient{
				Response: &http.Response{
					StatusCode: http.StatusOK,
					Body:       io.NopCloser(bytes.NewBufferString(`{"key": "value"`)),
				},
			},
			expectedError: ErrorNotJSON,
		},
		{
			name: "Empty JSON",
			URL:  exampleURL,
			mockClient: &MockHttpClient{
				Response: &http.Response{
					StatusCode: http.StatusOK,
					Body:       io.NopCloser(bytes.NewBufferString("")),
				},
			},
			expectedError: ErrorNotJSON,
		},
		{
			name: "HTTP Error",
			URL:  exampleURL,
			mockClient: &MockHttpClient{
				Err: fmt.Errorf("network error"),
			},
			expectedError: fmt.Errorf("network error"),
		},
		{
			name: "Not OK Status",
			URL:  exampleURL,
			mockClient: &MockHttpClient{
				Response: &http.Response{
					StatusCode: http.StatusInternalServerError,
					Body:       io.NopCloser(bytes.NewBufferString("error")),
				},
			},
			expectedError: fmt.Errorf("%w: 500", ErrorNotOKStatusCode),
		},
		{
			name: "Empty URL",
			URL:  "",
			mockClient: &MockHttpClient{
				Response: &http.Response{
					StatusCode: http.StatusOK,
					Body:       io.NopCloser(bytes.NewBufferString(exampleResponse)),
				},
			},
			expectedError: ErrorEmptyURL,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			retriever := &ApiDataRetriever{
				URL:    tt.URL,
				Client: tt.mockClient,
			}

			data, err := retriever.GetData()
			if err != nil && err.Error() != tt.expectedError.Error() {
				t.Fatalf("expected error '%v', actual: %v", tt.expectedError, err)
			}

			if tt.expectedText != "" && string(data) != tt.expectedText {
				t.Fatalf("expected '%s', actual: %s", tt.expectedText, string(data))
			}
		})
	}
}
