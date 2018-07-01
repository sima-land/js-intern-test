package handlers

import (
	"encoding/json"
	"github.com/balalay12/intern-test/golang/rest-service/database"
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	users := database.List()

	js, err := json.Marshal(users)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// get user by ID
func GetUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idUser := vars["id"]
	responseError := make(map[string]string)
	w.Header().Set("Content-Type", "application/json")

	if idUser != "" {
		id, err := strconv.Atoi(idUser)
		if err != nil {
			responseError["error"] = "ID must be INT"
			js, err := json.Marshal(responseError)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write(js)
			return
		}

		user, exist := database.Single(id)

		if !exist {
			responseError["error"] = "User is not existed"
			js, err := json.Marshal(responseError)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write(js)
			return
		}

		js, err := json.Marshal(user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write(js)
	}
}

// create new user
func NewUser(w http.ResponseWriter, r *http.Request) {
	name := r.FormValue("name")

	if name != "" {

		user := database.Create(name)

		js, err := json.Marshal(user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	}
}

// POST method
func EditUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idUser := vars["id"]
	inputNewName := r.FormValue("name")
	responseError := make(map[string]string)
	w.Header().Set("Content-Type", "application/json")

	if idUser != "" || inputNewName != "" {

		id, err := strconv.Atoi(idUser)
		if err != nil {
			responseError["error"] = "ID must be INT"
			js, err := json.Marshal(responseError)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write(js)
			return
		}

		user, exists := database.Edit(id, inputNewName)
		if !exists {
			responseError["error"] = "User is not exists"
			js, err := json.Marshal(responseError)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write(js)
			return
		}

		js, err := json.Marshal(user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write(js)
	}
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idUser := vars["id"]
	response := make(map[string]string)
	w.Header().Set("Content-Type", "application/json")

	if idUser != "" {
		id, err := strconv.Atoi(idUser)
		if err != nil {
			response["error"] = "ID must be INT"
			js, err := json.Marshal(response)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write(js)
			return
		}

		if !database.Delete(id) {
			response["error"] = "User is not exists"
			js, err := json.Marshal(response)
			if err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Write(js)
			return
		}

		response["OK"] = "User deleted"
		js, err := json.Marshal(response)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Write(js)
	}
}
