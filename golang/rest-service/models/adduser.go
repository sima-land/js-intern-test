package models

import (
	"database/sql"
)

var conn *sql.DB

//SetConn - назначает соединение с БД на переменную conn
func SetConn(connection *sql.DB) {
	conn = connection
} 

//AddUser - добавляет в базу нового пользователя по имени и возвращает его ID
func AddUser(userName string) (int, error) {
	result, err := conn.Exec("insert into users(name) values(?)", userName)
	if err != nil {
		return 0, err
	}
	lastID, err := result.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(lastID), nil
}
