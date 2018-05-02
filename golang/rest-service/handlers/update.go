package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (env *Env) UserUpdate(writer http.ResponseWriter, request *http.Request, params httprouter.Params) {
	type Name struct {
		Name string `json:"name"`
	}

	var user Name
	var userName User
	var response []byte

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	r := *request

	if r.Header.Get("Content-Type") != "application/json" {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if r.Body == nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err = json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(writer, err)
		return
	}

	row, err := env.DB.Prepare("SELECT id, name FROM Users WHERE id = ?")
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(writer, err)
		return
	}
	defer row.Close()

	err = row.QueryRow(id).Scan(&userName.ID, &userName.Name)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(writer, "User not found")
		return
	}

	_, err = env.DB.Exec("UPDATE Users SET name = ? WHERE id = ?", user.Name, id)
	if err != nil {
		log.Fatal(err)
	}

	userName.ID = id
	userName.Name = user.Name

	response, err = json.Marshal(userName)
	if err != nil {
		log.Fatal(err)
	}

	writer.Header().Set("Content-Type", "application/json")
	fmt.Fprint(writer, string(response))
}
