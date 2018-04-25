package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func InitDB(address string) error {
	if err := initDB(address); err != nil {
		CloseDB()
		return err
	}
	return nil
}

func initDB(address string) error {
	var err error
	if db, err = sql.Open("sqlite3", address); err != nil {
		return err
	}
	if _, err = db.Exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"); err != nil {
		return err
	}
	if stmtSelectUser, err = db.Prepare("SELECT name FROM users WHERE id = ?"); err != nil {
		return err
	}
	if stmtInsertUser, err = db.Prepare("INSERT INTO users (name) VALUES (?)"); err != nil {
		return err
	}
	if stmtUpdateUser, err = db.Prepare("UPDATE users SET name = ? WHERE id = ?"); err != nil {
		return err
	}
	if stmtDeleteUser, err = db.Prepare("DELETE FROM users WHERE id = ?"); err != nil {
		return err
	}
	return nil
}

func CloseDB() {
	if stmtSelectUser != nil {
		stmtSelectUser.Close()
	}
	if stmtInsertUser != nil {
		stmtInsertUser.Close()
	}
	if stmtUpdateUser != nil {
		stmtUpdateUser.Close()
	}
	if stmtDeleteUser != nil {
		stmtDeleteUser.Close()
	}
	if db != nil {
		db.Close()
	}
}
