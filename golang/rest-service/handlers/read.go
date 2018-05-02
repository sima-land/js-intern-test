package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (env *Env) UserGet(writer http.ResponseWriter, request *http.Request, params httprouter.Params) {
	var user User
	var response []byte

	id := params.ByName("id")

	row, err := env.DB.Prepare("select id, name from Users where id = ?")
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}
	defer row.Close()

	err = row.QueryRow(id).Scan(&user.ID, &user.Name)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	response, err = json.Marshal(user)
	if err != nil {
		log.Fatal(err)
	}

	writer.Header().Set("Content-Type", "application/json")
	fmt.Fprint(writer, string(response))
}
