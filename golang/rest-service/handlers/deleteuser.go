package handlers

import (
	"log"
	"net/http"
	"github.com/nikulnik/rest-service/models"
)


//DeleteUserData - входящий JSON для удаления
type DeleteUserData struct {
	ID 	int    `json:"id"`
}

//ChangeUser - хэндлер для изменения пользователя
func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	id, body := getID(r.Body)
	if id == 0 {
		log.Println("получен пустой ID при запросе на получение польз.")
		http.Error(w, getErrorJSON(`невозможно прочитать поле id`, body), 400)
		return
	}
	if id == 0 {
		log.Println("пустой ID при удалении польз.")
		http.Error(w, getErrorJSON(`невозможно прочитать поле id`, body), 400)
		return
	}
	
	userErr, err := models.DeleteUser(id)
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
