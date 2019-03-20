package domain_i

type User struct {
	ID   int
	Name string
}

type IUserRepository interface {
	IUserRepositoryAdder
	IUserRepositoryGetter
	IUserRepositoryUpdater
	IUserRepositoryDeleter
}

type IUserRepositoryAdder interface {
	AddUser(name string) (err error)
	AddUserS(user User) (err error)
}

type IUserRepositoryGetter interface {
	GetUserByID(id int) (user User, err error)
}

type IUserRepositoryUpdater interface {
	UpdateUser(id int, name string) (err error)
	UpdateUserS(user User) (err error)
}

type IUserRepositoryDeleter interface {
	DeleteUser(id int) (err error)
}
