package domainInterface

// this is struct of user
type User struct {
	ID   int    `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
}

// this is interface for user repository
type IUserRepository interface {
	IUserRepositoryAdder
	IUserRepositoryGetter
	IUserRepositoryUpdater
	IUserRepositoryDeleter
}

// this is interface for adding user
type IUserRepositoryAdder interface {
	AddUser(name string) (err error)
	AddUserS(user User) (err error)
}

// this is interface for getting user
type IUserRepositoryGetter interface {
	GetUserByID(id int) (user User, err error)
}

// this is interface for update user
type IUserRepositoryUpdater interface {
	UpdateUser(id int, name string) (err error)
	UpdateUserS(user User) (err error)
}

// this is interface for delete user
type IUserRepositoryDeleter interface {
	DeleteUser(id int) (err error)
}
