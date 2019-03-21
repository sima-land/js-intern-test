package users

import (
	"fmt"
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
	l := len([]rune(name))
	if l < 6 || l > 255 {
		return nil, fmt.Errorf("new user name (%s) can't be less than "+
			"6 characters or greater than 255", name)
	}

	id, err := u.s.Create(name)
	if err != nil {
		return nil, fmt.Errorf("create user: %v", err)
	}

	return &User{ID: id, Name: name}, nil
}

//User loads user.
func (u *Users) User(id int) (user *User, err error) {
	if id == 0 {
		return nil, fmt.Errorf("user %d id can't be 0", id)
	}

	name, err := u.s.User(id)
	if err != nil {
		return nil, fmt.Errorf("get user %d: %v", id, err)
	}

	if name == "" {
		return nil, nil
	}

	return &User{ID: id, Name: name}, nil
}

//Edit edit user by user id.
func (u *Users) Edit(id int, name string) (user *User, err error) {
	if id == 0 {
		return nil, fmt.Errorf("user %d id can't be 0", id)
	}

	l := len([]rune(name))
	if l < 6 || l > 255 {
		return nil, fmt.Errorf("user %d name (%s) can't be less than "+
			"6 characters or greater than 255", id, name)
	}

	name, err = u.s.Edit(id, name)
	if err != nil {
		return nil, fmt.Errorf("edit user %d: %v", id, err)
	}

	if name == "" {
		return nil, nil
	}

	return &User{ID: id, Name: name}, nil
}

//Delete deletes user by user id.
func (u *Users) Delete(id int) error {
	if id == 0 {
		return fmt.Errorf("user %d id can't be 0", id)
	}

	err := u.s.Delete(id)
	if err != nil {
		return fmt.Errorf("delete user %d: %v", id, err)
	}

	return nil
}

//New create new object to manage users.
func New(s Storage) *Users {
	return &Users{s: s}
}
