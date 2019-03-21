package mysql

import (
	"database/sql"
	di "github.com/kostyaBro/intern-test/golang/rest-service/domain/i"
)

type mySQLUserConnector struct {
	connector *sql.DB
}

func (msc *mySQLConnector) User() di.IUserRepository {
	return &mySQLUserConnector{connector: msc.connector}
}

func (msuc *mySQLUserConnector) AddUser(name string) (err error) {
	_, err = msuc.connector.Exec("insert into `user`(`name`) value (?);", name)
	return
}

func (msuc *mySQLUserConnector) AddUserS(user di.User) (err error) {
	_, err = msuc.connector.Exec("insert into `user`(`id`, `name`) value (?, ?);", user.ID, user.Name)
	return
}

func (msuc *mySQLUserConnector) GetUserByID(id int) (user di.User, err error) {
	err = msuc.connector.QueryRow("select `id`, `name` from `user` where `id` = ? limit 1;", id).Scan(&user.ID, &user.Name)
	return
}

func (msuc *mySQLUserConnector) UpdateUser(id int, name string) (err error) {
	_, err = msuc.connector.Exec("update `user` set `name` = ? where `id` = ?", name, id)
	return
}

func (msuc *mySQLUserConnector) UpdateUserS(user di.User) (err error) {
	_, err = msuc.connector.Exec("update `user` set `name` = ? where `id` = ?", user.Name, user.ID)
	return
}

func (msuc *mySQLUserConnector) DeleteUser(id int) (err error) {
	_, err = msuc.connector.Exec("delete from `user` where `id` = ? limit 1", id)
	return
}
