package handlers

import (
	"log"
	"encoding/json"
	"net/http"
	"github.com/nikulnik/rest-service/models"
)


//DeleteUserData - входящий JSON для получения данных польз.
type GetUserData struct {
	ID 	int    `json:"id"`
}

//GetUserResponse - ответ на запрос данных пользователя
type GetUserResponse struct {
	ID 	 int    	  `json:"id"`
	Data []FieldValue `json:"data"`
}

type FieldValue struct {
	Field string 	  `json:"field"`
	Value interface{} `json:"value"`
}

//GetUser - хэндлер для получения пользователя
func GetUser(w http.ResponseWriter, r *http.Request) {
	//var u GetUserData
	w.Header().Set("Content-Type", "application/json")
	id, body := getID(r.Body)
	if id == 0 {
		log.Println("получен пустой ID при запросе на получение польз.")
		http.Error(w, getErrorJSON(`невозможно прочитать поле id`, body), 400)
		return
	}
	
	userName, userErr, err := models.GetUserName(id)
	if err != nil {
		log.Println("ошибка при получении имени пользователя:", err)
		http.Error(w, getErrorJSON(userErr, body), 400)
		return
	}
	if userErr != "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(userErr))
		return
	}
	fieldsArr := []FieldValue{
		{
			Value: userName,
			Field: "name",
		},
	}
	resp := GetUserResponse{
		ID: id,
		Data: fieldsArr,
	}

	respBytes, _ := json.Marshal(resp)
	w.Write(respBytes)
}
