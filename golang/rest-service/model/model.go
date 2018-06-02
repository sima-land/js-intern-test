package model

type User struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func ClearSliceUser() []User {
	return []User{}
}

func ClearUser() User {
	return User{}
}
