package dataretriever

type DataRetriever interface {
	GetData() ([]byte, error)
}
