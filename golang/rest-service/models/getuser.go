package models

import (
	"database/sql"
)

//GetUserName - меняет имя польз. по ID 
//1 - имя пользователя, 2 - текст ошибки для пользователя
func GetUserName(id int) (string, string, error) {
	var name string
	
	err := conn.QueryRow("SELECT name FROM users WHERE id=? LIMIT 1", id).Scan(&name)
	switch {
	case err == sql.ErrNoRows:
		return "", "пользователь с данным ID не найден", err
	case err != nil:
		return "", "внутренняя ошибка", err
	default:
		return name, "", nil
	}
}
