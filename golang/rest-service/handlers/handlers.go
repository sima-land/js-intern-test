package handlers

import (
	"encoding/json"
	"github.com/balalay12/intern-test/golang/rest-service/database"
	"github.com/gorilla/mux"
	"io/ioutil"
	"net/http"
	"strconv"
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
	responseError := make(map[string]string)
	w.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(r)
	idUser := vars["id"]

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

// create new user
func NewUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	user := database.User{}

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "", 400)
		return
	}

	err = json.Unmarshal(body, &user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if user.Name != "" {
		user := database.Create(user.Name)

		js, err := json.Marshal(user)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Write(js)
	}
}

// POST method
func EditUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var err error
	responseError := make(map[string]string)
	user := database.User{}
	vars := mux.Vars(r)
	idUser := vars["id"]

	user.Id, err = strconv.Atoi(idUser)
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

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "", 400)
		return
	}

	err = json.Unmarshal(body, &user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, exists := database.Edit(&user)
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

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idUser := vars["id"]
	response := make(map[string]string)
	w.Header().Set("Content-Type", "application/json")

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
