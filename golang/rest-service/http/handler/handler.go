package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"

	"github.com/sima-land/intern-test/golang/rest-service/users"
)

//Users abstract the logic for a work with users.
type Users interface {
	Create(name string) (*users.User, error)
	User(id int) (*users.User, error)
	Edit(id int, name string) (*users.User, error)
	Delete(id int) error
}

type createRequest struct {
	Name string `json:"name"`
}

type editRequest struct {
	Name string `json:"name"`
}

//Create wraps the create user handler to pass the dependency through.
func Create(u Users) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		req := new(createRequest)
		err := json.NewDecoder(r.Body).Decode(req)
		if err != nil {
			log.Printf("json-decode request: %v", err)
			http.Error(w, "json-decode request failed", http.StatusBadRequest)
			return
		}

		user, err := u.Create(req.Name)
		if err != nil {
			log.Printf("user creation: %v", err)
			http.Error(w, "failed to create user", http.StatusInternalServerError)
			return
		}

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			log.Printf("json-encode a response: %v", err)
		}
	}
}

//User wraps the get user handler to pass the dependency through.
func User(u Users) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(chi.URLParam(r, "id"))
		if err != nil {
			log.Printf("getting user id: %v", err)
			http.Error(w, "failed to get user id", http.StatusBadRequest)
			return
		}

		user, err := u.User(id)
		if err != nil {
			log.Printf("user getting: %v", err)
			http.Error(w, "failed to edit user", http.StatusInternalServerError)
			return
		}

		if user == nil {
			log.Printf("user %d not found", id)
			http.Error(w, "user not found", http.StatusNotFound)
			return
		}

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			log.Printf("json-encode a response: %v", err)
		}
	}
}

//Edit wraps the edit user handler to pass the dependency through.
func Edit(u Users) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(chi.URLParam(r, "id"))
		if err != nil {
			log.Printf("getting user id: %v", err)
			http.Error(w, "failed to get user id", http.StatusBadRequest)
			return
		}

		req := new(editRequest)
		err = json.NewDecoder(r.Body).Decode(req)
		if err != nil {
			log.Printf("json-decode request: %v", err)
			http.Error(w, "json-decode request failed", http.StatusBadRequest)
			return
		}

		user, err := u.Edit(id, req.Name)
		if err != nil {
			log.Printf("user editing: %v", err)
			http.Error(w, "failed to edit user", http.StatusInternalServerError)
			return
		}

		if user == nil {
			log.Printf("user %d not found", id)
			http.Error(w, "user not found", http.StatusNotFound)
			return
		}

		w.WriteHeader(http.StatusOK)

		err = json.NewEncoder(w).Encode(user)
		if err != nil {
			log.Printf("json-encode a response: %v", err)
		}
	}
}

//Delete wraps the delete user handler to pass the dependency through.
func Delete(u Users) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(chi.URLParam(r, "id"))
		if err != nil {
			log.Printf("getting user id: %v", err)
			http.Error(w, "failed to get user id", http.StatusBadRequest)
			return
		}

		err = u.Delete(id)
		if err != nil {
			log.Printf("user deleting: %v", err)
			http.Error(w, "failed to delete user", http.StatusInternalServerError)
		}
	}
}
