package mysql

import (
	"database/sql"
	. "github.com/kostyaBro/intern-test/golang/rest-service/domain/i"
)

type mySqlUserConnector struct {
	connector *sql.DB
}

func (msc *mySqlConnector) User() IUserRepository {
	return &mySqlUserConnector{connector: msc.connector}
}

func (msuc *mySqlUserConnector) AddUser(name string) (err error) {
	_, err = msuc.connector.Exec("insert into `user`(`name`) value (?);", name)
	return
}

func (msuc *mySqlUserConnector) AddUserS(user User) (err error) {
	_, err = msuc.connector.Exec("insert into `user`(`id`, `name`) value (?, ?);", user.ID, user.Name)
	return
}

func (msuc *mySqlUserConnector) GetUserByID(id int) (user User, err error) {
	err = msuc.connector.QueryRow("select `id`, `name` from `user` where `id` = ? limit 1;", id).Scan(&user.ID, &user.Name)
	return
}

func (msuc *mySqlUserConnector) UpdateUser(id int, name string) (err error) {
	_, err = msuc.connector.Exec("update `user` set `name` = ? where `id` = ?", name, id)
	return
}

func (msuc *mySqlUserConnector) UpdateUserS(user User) (err error) {
	_, err = msuc.connector.Exec("update `user` set `name` = ? where `id` = ?", user.Name, user.ID)
	return
}

func (msuc *mySqlUserConnector) DeleteUser(id int) (err error) {
	_, err = msuc.connector.Exec("delete from `user` where `id` = ? limit 1", id)
	return
}
