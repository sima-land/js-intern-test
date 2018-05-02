package handlers

import (
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (env *Env) UserDelete(writer http.ResponseWriter, request *http.Request, params httprouter.Params) {
	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	_, err = env.DB.Exec("DELETE FROM Users WHERE id = ?", id)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		return
	}

	writer.WriteHeader(http.StatusAccepted)
}
