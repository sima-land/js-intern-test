package handlers

import (
	"log"
	"encoding/json"
	"net/http"
	"io/ioutil"
	"github.com/nikulnik/rest-service/models"
)


//ChangeUserData - входящий JSON для изменения пользователя
type ChangeUserData struct {
	NewUserName string `json:"new_name"`
	ID 			int    `json:"id"`
}

//ChangeUser - хэндлер для изменения пользователя
func ChangeUser(w http.ResponseWriter, r *http.Request) {
	var u ChangeUserData
	w.Header().Set("Content-Type", "application/json")
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "", 400)
		return
	} 
	err = json.Unmarshal(body, &u)
	if err != nil {
		log.Println("change user json decode error:", err)
		http.Error(w, getErrorJSON(`неправильный формат данных`, body), 400)
		return
	}
	if u.NewUserName == "" {
		log.Println("empty new_name")
		http.Error(w, getErrorJSON(`невозможно прочитать поле new_name`, body), 400)
		return
	}
	if u.ID == 0 {
		log.Println("empty ID")
		http.Error(w, getErrorJSON(`невозможно прочитать поле id`, body), 400)
		return
	}
	
	userErr, err := models.ChangeUserName(u.NewUserName, u.ID)
	if err != nil {
		log.Println("ошибка при изменении имени пользователя: ", err)
		http.Error(w, getErrorJSON(userErr, body), 400)
		return
	}
	if userErr != "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(userErr))
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
