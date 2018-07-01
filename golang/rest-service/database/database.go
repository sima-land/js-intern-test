package database

import (
	"database/sql"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
	"io/ioutil"
)

type User struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

var DB *sql.DB

func init() {
	fmt.Println("Init database...")
	dsn := "file:app.db??cache=shared&mode=rwc"
	db, err := sql.Open("sqlite3", dsn)
	if err != nil {
		panic(err)
	}

	DB = db

	DB.SetMaxOpenConns(1)

	err = DB.Ping()
	if err != nil {
		panic(err)
	}

	query, err := ioutil.ReadFile("database/users.sql")
	if err != nil {
		panic(err)
	}

	if _, err := DB.Exec(string(query)); err != nil {
		panic(err)
	}
}

func List() []*User {
	users := []*User{}
	rows, err := DB.Query("SELECT id, name FROM users")
	if err != nil {
		panic(err)
	}

	for rows.Next() {
		user := &User{}
		err = rows.Scan(&user.Id, &user.Name)
		if err != nil {
			panic(err)
		}

		users = append(users, user)
	}
	rows.Close()

	return users
}

func Single(id int) (*User, bool) {
	user := &User{}
	row := DB.QueryRow("SELECT id, name FROM users WHERE id = ?", id)
	err := row.Scan(&user.Id, &user.Name)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, false
		}
	}

	return user, true
}

func Create(name string) *User {
	result, err := DB.Exec(
		"INSERT INTO users (`name`) VALUES (?)",
		name,
	)

	if err != nil {
		panic(err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		panic(err)
	}

	return &User{int(id), name}
}

func Edit(idUser int, name string) (*User, bool) {
	_, exist := Single(idUser)
	if !exist {
		return nil, false
	}

	_, err := DB.Exec(
		"UPDATE users SET"+
			"`name` = ?"+
			"WHERE id = ?",
		name,
		idUser,
	)

	if err != nil {
		panic(err)
	}

	return &User{idUser, name}, true
}

func Delete(idUser int) bool {
	_, exist := Single(idUser)
	if !exist {
		return false
	}

	_, err := DB.Exec(
		"DELETE FROM users WHERE id = ?",
		idUser,
	)

	if err != nil {
		panic(err)
	}

	return true
}
