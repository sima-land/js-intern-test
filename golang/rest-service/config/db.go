package config

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var Connect *sql.DB

func ConnectToDB() {
	var err error
	Connect, err = sql.Open("sqlite3", "./users.db")
	statement, _ := Connect.Prepare("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)")
	statement.Exec()
	if err != nil {
		log.Fatal(err)
	}
	err = Connect.Ping()
	if err != nil {
		log.Fatal(err)
	}
}
