package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

type Meta struct {
	Code    int    `json:"code"`
	Message string `json:"string,omitempty"`
}
type Response struct {
	Meta     Meta        `json:"meta"`
	Response interface{} `json:"response,omitempty"`
}

func NotFound(w http.ResponseWriter, r *http.Request) {
	ResponseError(w, http.StatusNotFound, "404 page not found")
}
func Index(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Users REST API"))
}

func ResponseError(w http.ResponseWriter, code int, msg string) {
	log.Println("Ошибка (код " + strconv.Itoa(code) + "): " + msg)

	w.WriteHeader(code)
	answer := Response{
		Meta: Meta{
			Code:    code,
			Message: msg,
		},
	}
	body, _ := json.Marshal(answer)
	w.Write(body)
}

func ResponseOk(w http.ResponseWriter, response interface{}) {
	w.WriteHeader(http.StatusOK)
	answer := Response{
		Meta: Meta{
			Code: http.StatusOK,
		},
		Response: response,
	}
	body, _ := json.Marshal(answer)
	w.Write(body)
}
