package main

import (
	"github.com/gorilla/mux"
	"github.com/kostyaBro/intern-test/golang/rest-service/api"
	"net/http"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/api/{object}/{method}", api.Distributor).Methods("POST")
	print(http.ListenAndServe(":8080", router))
}
