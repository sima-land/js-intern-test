package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	"users/config"
	"users/models"
	"users/utils"

	"github.com/gorilla/mux"
)

func GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID, err := strconv.Atoi(vars["userID"])
	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}
	user := models.User{ID: userID}
	if err := user.Get(config.Connect); err != nil {
		utils.ResponseError(w, http.StatusNotFound, err.Error())
		return
	}
	utils.ResponseJSON(w, http.StatusOK, user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID, err := strconv.Atoi(vars["userID"])
	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}
	user := models.User{ID: userID}
	if err := user.Get(config.Connect); err != nil {
		utils.ResponseError(w, http.StatusNotFound, err.Error())
		return
	}
	decoder := json.NewDecoder(r.Body)
	var userUpdated models.User
	err = decoder.Decode(&userUpdated)
	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}
	user.Name = userUpdated.Name
	if err := user.Update(config.Connect); err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}
	utils.ResponseJSON(w, http.StatusOK, user)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user models.User
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}
	if err := user.Create(config.Connect); err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}
	utils.ResponseJSON(w, http.StatusOK, user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID, err := strconv.Atoi(vars["userID"])
	if err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}
	user := models.User{ID: userID}
	if err := user.Get(config.Connect); err != nil {
		utils.ResponseError(w, http.StatusNotFound, err.Error())
		return
	}
	if err := user.Delete(config.Connect); err != nil {
		utils.ResponseError(w, http.StatusInternalServerError, err.Error())
		return
	}
	utils.ResponseJSON(w, http.StatusOK, user)
}
