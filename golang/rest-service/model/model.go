package model

//User структура данных
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

//ClearSliceUser возвращаем чистый слайс чтобы не создавать глобальную переменную
// которую при необходимости надо будет очищать
func ClearSliceUser() []User {
	return []User{}
}

//ClearUser создаем пустой инстанс пользователя
func ClearUser() User {
	return User{}
}
