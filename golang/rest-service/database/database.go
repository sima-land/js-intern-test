package database

import (
	"database/sql"
	_ "github.com/lib/pq"
	"fmt"
	"github.com/SArtemJ/intern-test/golang/rest-service/model"
	"log"
)

var (
	DB     *sql.DB
	dbUser = "myuser"
	dbPass = "pass"
	dbName = "apptest"
	Msg    = ""
)

func init() {

	var err error
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", dbUser, dbPass, dbName)
	DB, err = sql.Open("postgres", dbinfo)
	if err != nil {
		panic(err)
	}
	//defer DB.Close()
}

func GetAllFromDB() []model.User {
	//получаем чистый слайс объектов модели User
	uS := model.ClearSliceUser()
	//получаем чистый объект User
	User := model.ClearUser()

	stringQ := "SELECT * FROM users"
	rows, err := DB.Query(stringQ)
	if err != nil {
		log.Println("No users in DB")
	}

	defer rows.Close()

	for rows.Next() {
		//записываем данные из строк DB в объект User
		err := rows.Scan(&User.Id, &User.Name)
		if err != nil {
			log.Println("Bad request to DB")
		}
		//Заполняем слайс
		uS = append(uS, User)
	}
	return uS
}

func GetOneUserFromDB(i int) (model.User, bool) {
	//получаем чистый объект User
	User := model.ClearUser()

	stringQ := "SELECT * FROM users WHERE id=$1"
	row, err := DB.Query(stringQ, i)
	if err != nil {
		log.Println("User not exist in DB")
		return model.User{}, false
	}
	defer row.Close()

	for row.Next() {
		err := row.Scan(&User.Id, &User.Name)
		if err != nil {
			log.Println(err.Error())
			return model.User{}, false
		}
	}
	return User, true
}

//получаем уникальный ID из таблиыц для новой записи
func TableIDs(nameT string) (lastID int) {
	stringQ := "SELECT COUNT(ID) FROM " + nameT + ""
	rows, err := DB.Query(stringQ)
	if err != nil {
		log.Println("Bad request to table")
	}

	defer rows.Close()

	for rows.Next() {
		err := rows.Scan(&lastID)
		if err != nil {
			log.Println("Bad request select from rows")
		}
	}

	lastID++
	return lastID
}

func InsertToDb(u model.User) (string, bool) {
	var stringQ = "INSERT INTO users (Id, Name) VALUES ($1, $2)"
	_, err := DB.Exec(stringQ, u.Id, u.Name)
	if err != nil {
		Msg = "Can't insert data to DB, try again"
		return Msg, false
	}
	Msg = "Row added"
	return Msg, true
}

func UpdateUserToDB(p1 string, p2 int) (string, bool) {
	stringQ := "UPDATE users SET name = $1 WHERE id = $2"
	_, err := DB.Exec(stringQ, p1, p2)
	if err != nil {
		Msg = "Can't update data to DB, try again"
		return Msg, false
	}
	Msg = "Row updated"
	return Msg, true
}

func DeleteToDB(i int) (string, bool) {
	stringQ := "DELETE FROM users WHERE id = $1"
	_, err := DB.Exec(stringQ, i)
	if err != nil {
		Msg = "Bad request to insert instance in table"
		return Msg, false
	}
	Msg = "Row deleted"
	return Msg, true
}
