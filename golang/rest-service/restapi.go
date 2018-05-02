package main

import (
	"log"
	"net/http"

	"github.com/formiat/intern-test/golang/rest-service/models"
)

func main() {
	if err := models.InitDB("database.db"); err != nil {
		log.Fatalln("Error init DB: " + err.Error())
	}
	defer models.CloseDB()

	router := NewRouter()
	log.Fatalln(http.ListenAndServe(":80", router))
}
