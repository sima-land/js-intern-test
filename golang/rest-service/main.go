package main

import (
	"net/http"

	"./db"
	"./handlers"

	"github.com/julienschmidt/httprouter"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	var env handlers.Env

	db := db.InitDB("store.db")
	defer db.Close()

	env.DB = db

	router := httprouter.New()

	router.GET("/user", env.UserList)          // list users
	router.POST("/user", env.UserNew)          // create users
	router.GET("/user/:id", env.UserGet)       // get user
	router.PUT("/user/:id", env.UserUpdate)    // update user
	router.DELETE("/user/:id", env.UserDelete) // delete user

	http.ListenAndServe(":8080", router)
}
