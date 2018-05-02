package handlers

import "database/sql"

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

type Env struct {
	DB *sql.DB
}
