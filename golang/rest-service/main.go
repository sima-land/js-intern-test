package main

import (
	"fmt"
	"github.com/balalay12/intern-test/golang/rest-service/handlers"
	"github.com/gorilla/mux"
	"net/http"
	"log"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", handlers.GetUsers).Methods("GET")
	r.HandleFunc("/user/{id:[0-9]+}", handlers.GetUser).Methods("GET")
	r.HandleFunc("/new", handlers.NewUser).Methods("POST")
	r.HandleFunc("/edit/{id:[0-9]+}", handlers.EditUser).Methods("PUT")
	r.HandleFunc("/delete/{id:[0-9]+}", handlers.DeleteUser).Methods("DELETE")
	http.Handle("/", r)

	fmt.Println("Starting server at :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
