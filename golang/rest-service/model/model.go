package model

//структура данных
type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

//возвращаем чистый слайс чтобы не создавать глобальную переменную
// которую при необходимости надо будет очищать
func ClearSliceUser() []User {
	return []User{}
}

//создаем пустой инстанс пользователя
func ClearUser() User {
	return User{}
}
