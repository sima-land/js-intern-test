package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (env *Env) UserList(writer http.ResponseWriter, request *http.Request, params httprouter.Params) {
	var users []User
	var response string

	rows, err := env.DB.Query("select id, name from Users")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var user User

		err = rows.Scan(&user.ID, &user.Name)
		if err != nil {
			log.Fatal(err)
		}

		users = append(users, user)
	}

	if len(users) != 0 {
		var js []byte
		js, err = json.Marshal(users)
		if err != nil {
			log.Fatal(err)
		}
		response = string(js)
	} else {
		response = "[]"
	}

	writer.Header().Set("Content-Type", "application/json")
	fmt.Fprint(writer, response)
}
