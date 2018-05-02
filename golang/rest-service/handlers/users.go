package handlers

import (
	"net/http"

	"database/sql"
	"encoding/json"
	"strconv"

	"github.com/formiat/intern-test/golang/rest-service/models"
	"github.com/gorilla/mux"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	vars := mux.Vars(r)
	userID, err := strconv.Atoi(vars["id"])
	if err != nil {
		ResponseError(w, http.StatusBadRequest, "неверный формат id: "+err.Error())
		return
	} else if userID <= 0 {
		ResponseError(w, http.StatusBadRequest, "id должен быть больше 0")
		return
	}

	user, err := models.GetUserByID(userID)
	if err != nil {
		if err == sql.ErrNoRows {
			ResponseError(w, http.StatusNotFound, "user с таким id не найден: "+err.Error())
		} else {
			ResponseError(w, http.StatusInternalServerError, "ошибка выполнения запроса: "+err.Error())
		}
		return
	}

	ResponseOk(w, user)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		ResponseError(w, http.StatusBadRequest, "неверный формат user: "+err.Error())
		return
	}

	if err := models.CreateUser(&user); err != nil {
		ResponseError(w, http.StatusInternalServerError, "ошибка выполнения запроса: "+err.Error())
		return
	}

	ResponseOk(w, user.ID)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	vars := mux.Vars(r)
	userID, err := strconv.Atoi(vars["id"])
	if err != nil {
		ResponseError(w, http.StatusBadRequest, "неверный формат id: "+err.Error())
		return
	} else if userID <= 0 {
		ResponseError(w, http.StatusBadRequest, "id должен быть больше 0")
		return
	}

	var user models.User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		ResponseError(w, http.StatusBadRequest, "неверный формат user: "+err.Error())
		return
	}
	user.ID = userID

	if err := models.UpdateUser(&user); err != nil {
		ResponseError(w, http.StatusInternalServerError, "ошибка выполнения запроса: "+err.Error())
		return
	}

	ResponseOk(w, nil)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()

	vars := mux.Vars(r)
	userID, err := strconv.Atoi(vars["id"])
	if err != nil {
		ResponseError(w, http.StatusBadRequest, "неверный формат id: "+err.Error())
		return
	} else if userID <= 0 {
		ResponseError(w, http.StatusBadRequest, "id должен быть больше 0")
		return
	}

	if err := models.DeleteUserByID(userID); err != nil {
		if err == sql.ErrNoRows {
			ResponseError(w, http.StatusNotFound, "user с таким id не найден: "+err.Error())
		} else {
			ResponseError(w, http.StatusInternalServerError, "ошибка выполнения запроса: "+err.Error())
		}
		return
	}

	ResponseOk(w, nil)
}
