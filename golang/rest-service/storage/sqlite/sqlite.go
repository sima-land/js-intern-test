package sqlite

import (
	"database/sql"
	"fmt"
)

//Storage represents the realisation of a Storage interface to work with an SQLite database.
type Storage struct {
	db *sql.DB
}

//InitStructure creates necessary tables in a database.
func (s *Storage) InitStructure() error {
	_, err := s.db.Exec(`create table user (id integer primary key, name varchar(255) not null)`)
	if err != nil {
		return fmt.Errorf("create table users: %v", err)
	}

	return nil
}

//Create creates new user in a database.
func (s *Storage) Create(name string) (id int, err error) {
	result, err := s.db.Exec(`insert into user (name) values ($1)`, name)
	if err != nil {
		return 0, fmt.Errorf("insert new user (%s): %v", name, err)
	}

	lastID, err := result.LastInsertId()
	if err != nil {
		return 0, fmt.Errorf("get last inserted id while creates new user (%s): %v", name, err)
	}

	return int(lastID), nil
}

//User load user related data drom a database by user id.
func (s *Storage) User(id int) (name string, err error) {
	row := s.db.QueryRow(`select name from user where user.id == $1`, id)

	err = row.Scan(&name)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", nil
		}

		return "", fmt.Errorf("scan user %d: %v", id, err)
	}

	return name, nil
}

//Edit edits user data by user id. Returns empty name and nil error if user is not found.
func (s *Storage) Edit(id int, name string) (string, error) {
	_, err := s.db.Exec(`update user set name = $1 where id == $2`, name, id)
	if err != nil {
		return "", fmt.Errorf("update user %d name (%s): %v", id, name, err)
	}

	name, err = s.User(id)
	if err != nil {
		return "", fmt.Errorf("re-get updated user: %v", err)
	}

	return name, err
}

//Delete deletes user by id.
func (s *Storage) Delete(id int) error {
	_, err := s.db.Exec(`delete from user where id == $1`, id)
	if err != nil {
		return fmt.Errorf("delete user %d: %v", id, err)
	}

	return nil
}

//New creates new Storage.
func New(db *sql.DB) *Storage {
	return &Storage{db: db}
}
