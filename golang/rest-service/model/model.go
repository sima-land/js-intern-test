package model

//структура данных User
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

//function ClearSliceUser возвращаем чистый слайс чтобы не создавать глобальную переменную
// которую при необходимости надо будет очищать
func ClearSliceUser() []User {
	return []User{}
}

//function ClearUser создаем пустой инстанс пользователя
func ClearUser() User {
	return User{}
}
