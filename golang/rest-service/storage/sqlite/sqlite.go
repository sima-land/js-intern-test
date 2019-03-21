package sqlite

import (
	"database/sql"

	"github.com/krocos/errors"
)

//Storage represents the realisation of a Storage interface to work with an SQLite database.
type Storage struct {
	db *sql.DB
}

//InitStructure creates necessary tables in a database.
func (s *Storage) InitStructure() error {
	_, err := s.db.Exec(`create table if not exists user (id integer primary key, name varchar(255) not null)`)
	if err != nil {
		return errors.Wrap(err, "failed to create table users")
	}

	return nil
}

//Create creates new user in a database.
func (s *Storage) Create(name string) (id int, err error) {
	errfields := map[string]interface{}{
		"name": name,
	}

	result, err := s.db.Exec(`insert into user (name) values ($1)`, name)
	if err != nil {
		return 0, errors.WrapWithFields(err, "failed to insert new user", errfields)
	}

	lastID, err := result.LastInsertId()
	if err != nil {
		return 0, errors.
			WrapWithFields(err, "failed to get last inserted id while creates new user", errfields)
	}

	return int(lastID), nil
}

//User load user related data drom a database by user id.
func (s *Storage) User(id int) (name string, err error) {
	errfields := map[string]interface{}{
		"id": id,
	}

	row := s.db.QueryRow(`select name from user where user.id == $1`, id)

	err = row.Scan(&name)
	if err != nil {
		if err == sql.ErrNoRows {
			return "", nil
		}

		return "", errors.WrapWithFields(err, "scan user data", errfields)
	}

	return name, nil
}

//Edit edits user data by user id. Returns empty name and nil error if user is not found.
func (s *Storage) Edit(id int, name string) (string, error) {
	errfields := map[string]interface{}{
		"id":   id,
		"name": name,
	}

	_, err := s.db.Exec(`update user set name = $1 where id == $2`, name, id)
	if err != nil {
		return "", errors.WrapWithFields(err, "failed to update user in the database", errfields)
	}

	name, err = s.User(id)
	if err != nil {
		return "", errors.WrapWithFields(err, "failed to re-get updated user", errfields)
	}

	return name, err
}

//Delete deletes user by id.
func (s *Storage) Delete(id int) error {
	errfields := map[string]interface{}{
		"id": id,
	}

	_, err := s.db.Exec(`delete from user where id == $1`, id)
	if err != nil {
		return errors.WrapWithFields(err, "failed to delete user from the database", errfields)
	}

	return nil
}

//New creates new Storage.
func New(db *sql.DB) *Storage {
	return &Storage{db: db}
}
