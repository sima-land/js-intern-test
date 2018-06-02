package main

import (
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	h "github.com/SArtemJ/intern-test/golang/rest-service/handlers"
	"net/http"
)

func main() {

	router := mux.NewRouter()

	router.HandleFunc("/users", h.AllUsers).Methods("GET")
	router.HandleFunc("/users/{id}", h.ShowOneUser).Methods("GET")
	router.HandleFunc("/users/", h.InsertUser).Methods("POST")
	router.HandleFunc("/users/{id}", h.UpdateUser).Methods("PATCH")
	router.HandleFunc("/users/{id}", h.DeleteUser).Methods("DELETE")
	http.ListenAndServe(":8000", router)

}
