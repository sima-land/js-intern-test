package users

import (
	"github.com/krocos/errors"
)

//User represents the user structure suitable for json-encoding.
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

//Storage represents storage interface.
type Storage interface {
	Create(name string) (id int, err error)
	User(id int) (name string, err error)
	Edit(id int, name string) (string, error)
	Delete(id int) error
}

//Users represents the object that contains the logic to manage users.
type Users struct {
	s Storage
}

//Create creates new user.
func (u *Users) Create(name string) (user *User, err error) {
	errfields := map[string]interface{}{
		"name": name,
	}

	l := len([]rune(name))
	if l < 6 || l > 255 {
		return nil, errors.NewWithFields("new user name can't be less than "+
			"6 characters or greater than 255", errfields)
	}

	id, err := u.s.Create(name)
	if err != nil {
		return nil, errors.WrapWithFields(err, "failed to create user in the storage", errfields)
	}

	return &User{ID: id, Name: name}, nil
}

//User loads user.
func (u *Users) User(id int) (user *User, err error) {
	errfields := map[string]interface{}{
		"id": id,
	}

	if id == 0 {
		return nil, errors.NewWithFields("user id can't be 0", errfields)
	}

	name, err := u.s.User(id)
	if err != nil {
		return nil, errors.WrapWithFields(err, "failed to get user from the storage", errfields)
	}

	if name == "" {
		return nil, nil
	}

	return &User{ID: id, Name: name}, nil
}

//Edit edit user by user id.
func (u *Users) Edit(id int, name string) (user *User, err error) {
	errfields := map[string]interface{}{
		"id":       id,
		"new_name": name,
	}

	if id == 0 {
		return nil, errors.NewWithFields("user id can't be 0", errfields)
	}

	l := len([]rune(name))
	if l < 6 || l > 255 {
		return nil, errors.NewWithFields("new user name can't be less than "+
			"6 characters or greater than 255", errfields)
	}

	name, err = u.s.Edit(id, name)
	if err != nil {
		return nil, errors.WrapWithFields(err, "failed to edit user in the storage", errfields)
	}

	if name == "" {
		return nil, nil
	}

	return &User{ID: id, Name: name}, nil
}

//Delete deletes user by user id.
func (u *Users) Delete(id int) error {
	errfields := map[string]interface{}{
		"id": id,
	}

	if id == 0 {
		return errors.NewWithFields("user id can't be 0", errfields)
	}

	err := u.s.Delete(id)
	if err != nil {
		return errors.WrapWithFields(err, "failed to delete user from the storage", errfields)
	}

	return nil
}

//New create new object to manage users.
func New(s Storage) *Users {
	return &Users{s: s}
}
