package main

import (
	"github.com/gorilla/mux"
	"github.com/kostyaBro/intern-test/golang/rest-service/api"
	"net/http"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/api/{object}/{method}", api.HandlerDistributor).Methods("POST")
	print(http.ListenAndServe(":8080", router))
}

/*
P.S.
comments in
golang/rest-service/config/config.go:3-7
golang/rest-service/domain/i/IUserRepository.go:3
golang/rest-service/domain/i/IUserRepository.go:9
golang/rest-service/domain/i/IUserRepository.go:17
golang/rest-service/domain/i/IUserRepository.go:23
golang/rest-service/domain/i/IUserRepository.go:28
golang/rest-service/domain/i/IUserRepository.go:34
golang/rest-service/domain/mysql/connector.go:5
golang/rest-service/domain/mysql/connector.go:18
I consider inappropriate and caprocode

And "syntax error at or near "`" in sql file"... seriously??
*/
