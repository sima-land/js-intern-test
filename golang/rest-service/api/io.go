package api

import (
	"encoding/json"
	"net/http"
)

type output struct {
	Status string      `json:"status"`
	Value  interface{} `json:"value"`
}

type outputSV struct {
	Status string `json:"status"`
	Value  string `json:"value"`
}

var success = outputSV{Status: "success", Value: "OK"}

func returnBadRequest(writer http.ResponseWriter, request *http.Request) {
	output := outputSV{
		Status: "error",
		Value:  http.StatusText(http.StatusBadRequest),
	}
	json.NewEncoder(writer).Encode(output)
}

func returnInternalServerError(writer http.ResponseWriter, request *http.Request) {
	output := outputSV{
		Status: "error",
		Value:  http.StatusText(http.StatusInternalServerError),
	}
	json.NewEncoder(writer).Encode(output)
}

func returnMethodNotAllowed(writer http.ResponseWriter, request *http.Request) {
	output := outputSV{
		Status: "error",
		Value:  http.StatusText(http.StatusMethodNotAllowed),
	}
	json.NewEncoder(writer).Encode(output)
}
