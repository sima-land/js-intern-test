package handlers

import (
	"log"
	"io/ioutil"
	"encoding/json"
	"net/http"
	"github.com/nikulnik/rest-service/models"
)


//AddUserData - входящий JSON для добавления пользователя
type AddUserData struct {
    UserName string `json:"user_name"`
}

//AddedUserID - ответ JSON на успешно добавленного пользователя
type AddedUserID struct {
    UserID int `json:"user_id"`
}

//AddUser - хэндлер для добавления пользователя
func AddUser(w http.ResponseWriter, r *http.Request) {
	var u AddUserData
	w.Header().Set("Content-Type", "application/json")
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "", 400)
		return
	} 

	err = json.Unmarshal(body, &u)
	if err != nil {
		log.Println("json decode error:", err)
		http.Error(w,getErrorJSON(`неправильный формат данных`, body), 400)
		return
	}
	if u.UserName == "" {
		log.Println("empty user name")
		http.Error(w, getErrorJSON(`невозможно прочитать поле user_name`, body), 400)
		return
	}
	
	userID, err := models.AddUser(u.UserName)
	if err != nil {
		log.Println("ошибка при добавлении нового пользователя в базу: ", err)
		http.Error(w, getErrorJSON(`внутренняя ошибка, попробуйте позже`, body), 400)
		return
	}
	resp, _ := json.Marshal(&AddedUserID{
		UserID: userID,
	})
	
	w.Write(resp)
}
