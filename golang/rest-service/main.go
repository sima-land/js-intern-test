package main

import (
	"log"
	"net/http"
	"database/sql"

	"github.com/nikulnik/rest-service/models"
	"github.com/nikulnik/rest-service/handlers"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	//os.Remove("./foo.db")

	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	models.SetConn(db) 

	http.HandleFunc("/adduser", handlers.AddUser)
	http.HandleFunc("/changeuser", handlers.ChangeUser)
	http.HandleFunc("/deleteuser", handlers.DeleteUser)
	http.HandleFunc("/getuser", handlers.GetUser)
    log.Fatal(http.ListenAndServe(":8080", nil))
}