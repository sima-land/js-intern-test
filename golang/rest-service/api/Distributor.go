package api

import (
	"encoding/json"
	"github.com/gorilla/mux"
	. "github.com/kostyaBro/intern-test/golang/rest-service/domain/i"
	"github.com/kostyaBro/intern-test/golang/rest-service/domain/mysql"
	"log"
	"net/http"
)

func Distributor(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Add("Content-type", "application/json; charset=utf-8")
	switch mux.Vars(request)["object"] {
	case "user":
		switch mux.Vars(request)["method"] {
		case "add":
			addUser(writer, request, mysql.GetInstance().User())
			return
		case "update":
			updateUser(writer, request, mysql.GetInstance().User())
			return
		case "get":
			getUser(writer, request, mysql.GetInstance().User())
			return
		case "delete":
			deleteUser(writer, request, mysql.GetInstance().User())
			return
		default:
			returnMethodNotAllowed(writer, request)
			return
		}
	default:
		returnMethodNotAllowed(writer, request)
		return
	}
}

func addUser(writer http.ResponseWriter, request *http.Request, adder IUserRepositoryAdder) {
	var user User
	err := json.NewDecoder(request.Body).Decode(&user)
	if err != nil {
		log.Printf("api.Distributor %s/%s err %s", mux.Vars(request)["object"], mux.Vars(request)["method"], err.Error())
		returnBadRequest(writer, request)
		return
	}
	if user.Name == "" {
		returnBadRequest(writer, request)
		return
	}
	err = adder.AddUser(user.Name)
	if err != nil {
		log.Printf("api.Distributor %s/%s err %s", mux.Vars(request)["object"], mux.Vars(request)["method"], err.Error())
		returnInternalServerError(writer, request)
		return
	}
	json.NewEncoder(writer).Encode(success)
}

func updateUser(writer http.ResponseWriter, request *http.Request, updater IUserRepositoryUpdater) {
	var user User
	err := json.NewDecoder(request.Body).Decode(&user)
	if err != nil {
		log.Printf("api.Distributor %s/%s err %s", mux.Vars(request)["object"], mux.Vars(request)["method"], err.Error())
		returnBadRequest(writer, request)
		return
	}
	if user.Name == "" || user.ID == 0 {
		returnBadRequest(writer, request)
		return
	}
	err = updater.UpdateUserS(user)
	if err != nil {
		log.Printf("api.Distributor %s/%s err %s", mux.Vars(request)["object"], mux.Vars(request)["method"], err.Error())
		returnInternalServerError(writer, request)
		return
	}
	json.NewEncoder(writer).Encode(success)
}

func getUser(writer http.ResponseWriter, request *http.Request, geter IUserRepositoryGetter) {
	var user User
	err := json.NewDecoder(request.Body).Decode(&user)
	if err != nil {
		log.Printf("api.Distributor %s/%s err %s", mux.Vars(request)["object"], mux.Vars(request)["method"], err.Error())
		returnBadRequest(writer, request)
		return
	}
	if user.ID == 0 {
		returnBadRequest(writer, request)
		return
	}
	user, err = geter.GetUserByID(user.ID)
	if err != nil {
		log.Printf("api.Distributor %s/%s err %s", mux.Vars(request)["object"], mux.Vars(request)["method"], err.Error())
		returnInternalServerError(writer, request)
		return
	}
	json.NewEncoder(writer).Encode(output{Status: "success", Value: user})
}

func deleteUser(writer http.ResponseWriter, request *http.Request, deleter IUserRepositoryDeleter) {
	var user User
	err := json.NewDecoder(request.Body).Decode(&user)
	if err != nil {
		log.Printf("api.Distributor %s/%s err %s", mux.Vars(request)["object"], mux.Vars(request)["method"], err.Error())
		returnBadRequest(writer, request)
		return
	}
	if user.ID == 0 {
		returnBadRequest(writer, request)
		return
	}
	err = deleter.DeleteUser(user.ID)
	if err != nil {
		log.Printf("api.Distributor %s/%s err %s", mux.Vars(request)["object"], mux.Vars(request)["method"], err.Error())
		returnInternalServerError(writer, request)
		return
	}
	json.NewEncoder(writer).Encode(success)
}
