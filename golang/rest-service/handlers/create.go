package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (env *Env) UserNew(writer http.ResponseWriter, request *http.Request, params httprouter.Params) {
	type Name struct {
		Name string `json:"name`
	}

	var user Name
	var id int

	r := *request

	if r.Header.Get("Content-Type") != "application/json" {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	if r.Body == nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		fmt.Fprint(writer, err)
		return
	}

	// Должно ли имя пользователя быть уникальным?
	_, err = env.DB.Exec("insert into Users(name) values(?)", user.Name)
	if err != nil {
		fmt.Fprint(writer, "User is exists")
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	stmt, err := env.DB.Prepare("select id from Users where name = ?")
	if err != nil {
		log.Fatal(err)
	}
	defer stmt.Close()

	err = stmt.QueryRow(user.Name).Scan(&id)
	if err != nil {
		log.Fatal(err)
	}

	writer.WriteHeader(http.StatusCreated)
	writer.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(writer, "{\"id\":%d}", id)
}
