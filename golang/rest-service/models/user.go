package models

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

var (
	db             *sql.DB
	stmtSelectUser *sql.Stmt
	stmtInsertUser *sql.Stmt
	stmtUpdateUser *sql.Stmt
	stmtDeleteUser *sql.Stmt
)

func GetUserByID(id int) (*User, error) {
	user := User{
		ID: id,
	}
	if err := stmtSelectUser.QueryRow(id).Scan(&user.Name); err != nil {
		return nil, err
	}
	return &user, nil
}

func CreateUser(user *User) error {
	res, err := stmtInsertUser.Exec(user.Name)
	if err != nil {
		return err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return err
	}
	user.ID = int(id)
	return nil
}

func UpdateUser(user *User) error {
	_, err := stmtUpdateUser.Exec(user.Name, user.ID)
	if err != nil {
		return err
	}
	return nil
}

func DeleteUserByID(id int) error {
	_, err := stmtDeleteUser.Exec(id)
	if err != nil {
		return err
	}
	return nil
}
