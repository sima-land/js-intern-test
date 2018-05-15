package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
	"users/config"
	"users/router"
)

func main() {
	config.ConnectToDB()
	config := config.Config
	routes := router.NewRouter()
	server := &http.Server{
		Addr:         config.Port,
		ReadTimeout:  config.ReadTimeout * time.Second,
		WriteTimeout: config.WriteTimeout * time.Second,
		Handler:      routes,
	}
	fmt.Printf("Running on port %s\n", config.Port)
	err := server.ListenAndServe()
	if err != nil {
		log.Fatal(err)
	}
}
