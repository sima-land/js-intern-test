package main

import (
	"os"
	"log"
	"net/http"
	"database/sql"

	"github.com/nikulnik/rest-service/models"
	"github.com/nikulnik/rest-service/handlers"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	os.Remove("users.db")
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	sqlStmt := `
	create table users (id integer not null primary key autoincrement, name text);`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		log.Printf("%q: %s\n", err, sqlStmt)
		return
	}

	models.SetConn(db) 


	http.HandleFunc("/adduser", handlers.AddUser)
	http.HandleFunc("/changeuser", handlers.ChangeUser)
	http.HandleFunc("/deleteuser", handlers.DeleteUser)
	http.HandleFunc("/getuser", handlers.GetUser)
    log.Fatal(http.ListenAndServe(":8080", nil))
}