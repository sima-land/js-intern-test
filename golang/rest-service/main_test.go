package main

import (
	"bytes"
	"testing"
	"net/http"
	"net/http/httptest"
	"encoding/json"
	"database/sql"

	"github.com/nikulnik/rest-service/handlers"
	"github.com/nikulnik/rest-service/models"

	_ "github.com/mattn/go-sqlite3"
)

func TestAddChangeDel(t *testing.T) {
	db, err := sql.Open("sqlite3", "./users.db")
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	models.SetConn(db) 

	body, status, err := request("/adduser", `{"user_name": "Владимир"}`, handlers.AddUser)
	checkErrFatal(t, err)
	addResp := &handlers.AddedUserID{}
	err =  json.Unmarshal(body, &addResp)
	checkErr(t, err, "ответ json не парсится")
	exists := checkRow(t, db, addResp.UserID)
	if exists == 0 {
		t.Error("Польз. с данным id не существует в базе")
	}
	
	body, status, err = request("/adduser", `{"user_name": ""}`, handlers.AddUser)
	checkErrFatal(t, err)
	if status != 400 {
		t.Error("Код ответа != 400 при отправке пустого имени пользователя")
	}

	changeNameData := &handlers.ChangeUserData{
		NewUserName: "Святополк", 
		ID: addResp.UserID, 
	}
	encoded, _ := json.Marshal(changeNameData)
	body, status, err = request("/changeuser", string(encoded), handlers.ChangeUser)
	checkErrFatal(t, err)
	if status != 204 {
		t.Error("Код ответа != 204 при изменении пользователя по ID")
	}
	checkRowValue(t, db, addResp.UserID, changeNameData.NewUserName)

	encoded, _ = json.Marshal(&handlers.ChangeUserData{
		NewUserName: "Вова", 
		ID: 9999999,
	})
	body, status, err = request("/changeuser", string(encoded), handlers.ChangeUser) //отправка неправильного id
	checkErrFatal(t, err)
	if status != 400 {
		t.Error("Код ответа != 400 при отправке неправильного айди для изменения пользователя")
	}

	encoded, _ = json.Marshal(&handlers.GetUserData{
		ID: addResp.UserID,
	})
	body, status, err = request("/getuser", string(encoded), handlers.GetUser) 
	checkErrFatal(t, err)
	if status != 200 {
		t.Error("Код ответа != 200 при получении польз.")
	}

	encoded, _ = json.Marshal(&handlers.DeleteUserData{
		ID: addResp.UserID,
	})
	body, status, err = request("/deleteuser", string(encoded), handlers.DeleteUser)
	checkErrFatal(t, err)
	if status != 204 {
		t.Error("Код ответа != 400 при отправке неправильного айди для изменения пользователя")
	}
	exists = checkRow(t, db, addResp.UserID)
	if exists == 1 {
		t.Error("Польз. остался в базе после удаления")
	}
}



func request(addr, reqBody string, handlerfunc func(http.ResponseWriter, *http.Request)) ([]byte, int, error) {
	req, err := http.NewRequest("GET", addr, bytes.NewBuffer([]byte(reqBody)))
	if err != nil {
		return nil, 0, err
	}
	req.Header.Set("Content-Type", "application/json")
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handlerfunc)
	handler.ServeHTTP(rr, req)
	return rr.Body.Bytes(), rr.Code, nil
}

func checkErrFatal(t *testing.T, err error) {
	if err != nil {
		t.Fatal(err)
	}
}

func checkErr(t *testing.T, err error, additionalText string) {
	if err != nil {
		t.Errorf("err: %s. my info: %s", err, additionalText)
	}
}

func checkRow(t *testing.T, conn *sql.DB, userID int) int {
	var exists int
	
	err := conn.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE id=? LIMIT 1);", userID).Scan(&exists)
	switch {
	case err == sql.ErrNoRows:
		t.Error("Польз. с данным id не существует базе")
	case err != nil:
		t.Error(err)
	default:
		return exists
	}
	return 1
}

func checkRowValue(t *testing.T, conn *sql.DB, userID int, userName string) {
	var queriedName string
	
	err := conn.QueryRow("SELECT name FROM users WHERE id=? LIMIT 1", userID).Scan(&queriedName)
	switch {
	case err == sql.ErrNoRows:
		t.Error("Польз. с данным id не существует базе")
	case err != nil:
		t.Error(err)
	default:
		if queriedName != userName {
			t.Error("Имя пользователя из базы не совпадает с тем, на которое оно должно было обновиться")
		}
	}
}