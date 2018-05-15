package models

import (
	"database/sql"
	"errors"
)

type User struct {
	ID   int    `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

func (u *User) Get(db *sql.DB) error {
	err := db.QueryRow(`SELECT id, name FROM users WHERE id = $1`, u.ID).Scan(&u.ID, &u.Name)
	if err != nil {
		if err == sql.ErrNoRows {
			return errors.New("User does not exist")
		} else {
			checkErr(err)
		}
	}
	return nil
}

func (u *User) Create(db *sql.DB) error {
	stmt, err := db.Prepare("INSERT INTO users (name) values(?)")
	checkErr(err)
	res, err := stmt.Exec(u.Name)
	checkErr(err)
	id, err := res.LastInsertId()
	checkErr(err)
	u.ID = int(id)
	return nil
}

func (u *User) Update(db *sql.DB) error {
	stmt, err := db.Prepare("UPDATE users SET name=? where id=?")
	checkErr(err)
	_, err = stmt.Exec(u.Name, u.ID)
	checkErr(err)
	return nil
}

func (u *User) Delete(db *sql.DB) error {
	stmt, err := db.Prepare("DELETE from users WHERE id=?")
	checkErr(err)
	_, err = stmt.Exec(u.ID)
	checkErr(err)
	return nil
}
