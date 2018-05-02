package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func InitDB(dbs string) *sql.DB {
	db, err := sql.Open("sqlite3", dbs)
	if err != nil {
		log.Fatal(err)
	}

	_, err = db.Exec("create table if not exists Users (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, name TEXT UNIQUE)")

	return db
}
