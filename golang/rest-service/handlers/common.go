package handlers

import (
	"log"
	"encoding/json"
	"io"
	"io/ioutil"
	"github.com/buger/jsonparser"
)

//ErrorResponse - Для ответа ошибкой
type ErrorResponse struct {
	Error    string `json:"error"`    //текст ошибки
	Request string  `json:"request"` //тело входящего запроса
}


func getErrorJSON(text string, requestBody []byte) string {
	resp, _ := json.Marshal(&ErrorResponse{
		Error: text,
		Request: string(requestBody),
	})
	return string(resp)
}

func getID(requestBody io.ReadCloser) (int, []byte) {
	body, err := ioutil.ReadAll(requestBody)
	if err != nil {
		log.Println(err)
		return 0, body
	} 
	id, err := jsonparser.GetInt(body, "id")
	if err != nil {
		log.Println(err)
		return 0, body
	}
	return int(id), body
}