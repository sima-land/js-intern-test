package handlers

import (
	"net/http"
	"encoding/json"
	"io"
	pgdb "github.com/SArtemJ/intern-test/golang/rest-service/database"
	"github.com/SArtemJ/intern-test/golang/rest-service/model"
	"github.com/gorilla/mux"
	"strconv"
)

func AllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	result := pgdb.GetAllFromDB()
	json.NewEncoder(w).Encode(result)
	w.WriteHeader(http.StatusOK)
}

func ShowOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	p := mux.Vars(r)
	pResInt, _ := strconv.Atoi(p["id"])
	if result, yes := pgdb.GetOneUserFromDB(pResInt); yes {
		json.NewEncoder(w).Encode(result)
		w.WriteHeader(http.StatusOK)
	} else {
		io.WriteString(w, "User not Found")
		w.WriteHeader(http.StatusNotFound)
	}
}

func InsertUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	newUser := model.User{
		Id:   pgdb.TableIDs("users"),
		Name: r.FormValue("name"),
	}
	pgdb.InsertToDb(newUser)
	io.WriteString(w, "User created")
	json.NewEncoder(w).Encode(newUser)
	w.WriteHeader(http.StatusOK)

}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	p := mux.Vars(r)
	pResInt, _ := strconv.Atoi(p["id"])

	if result, yes := pgdb.GetOneUserFromDB(pResInt); yes {
		result.Name = r.FormValue("name")
		if _, success := pgdb.UpdateUserToDB(result.Name, pResInt); success {
			io.WriteString(w, "User updated")
			json.NewEncoder(w).Encode(result)
			w.WriteHeader(http.StatusOK)
		} else {
			io.WriteString(w, "Can't update user")
			w.WriteHeader(http.StatusBadRequest)
		}
	}
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	p := mux.Vars(r)
	//конвертируем параметр string из vars в int
	pResInt, _ := strconv.Atoi(p["id"])

	if msg, logic := pgdb.DeleteToDB(pResInt); logic {
		io.WriteString(w, msg)
		w.WriteHeader(http.StatusOK)
	} else {
		io.WriteString(w, msg)
		w.WriteHeader(http.StatusBadRequest)
	}
}
