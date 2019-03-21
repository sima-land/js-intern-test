package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi"
	"github.com/krocos/errors"
	"github.com/rs/zerolog/log"

	"github.com/sima-land/intern-test/golang/rest-service/users"
)

//Users abstracts the logic for a work with users.
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

//Response represents a common response structure.
type Response struct {
	Result interface{} `json:"result"`
	Error  *Error      `json:"error"`
}

//Error represents an error to pass in Response.
type Error struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Details interface{} `json:"details"`
}

//Create wraps the create user handler to pass the dependency through.
func Create(u Users) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		req := new(createRequest)
		err := json.NewDecoder(r.Body).Decode(req)
		if err != nil {
			log.Error().Err(err).Msg("json-decode request")

			w.WriteHeader(http.StatusBadRequest)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusBadRequest,
				Message: "failed to json-decode request",
				Details: err.Error(),
			}})
			if serr != nil {
				log.Error().Err(serr).Msg("failed to json-encode a response")
			}
			return
		}

		user, err := u.Create(req.Name)
		if err != nil {
			log.
				Error().
				Err(err).
				RawJSON("stack", errors.RawJsonStack(err)).
				Msg("failed to create user")

			w.WriteHeader(http.StatusInternalServerError)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusInternalServerError,
				Message: "failed to create user",
				Details: errors.Stack(err),
			}})
			if serr != nil {
				log.Error().Err(serr).Msg("failed to json-encode a response")
			}
			return
		}

		err = json.NewEncoder(w).Encode(Response{Result: user})
		if err != nil {
			log.Error().Err(err).Msg("failed to json-encode a response")
		}
	}
}

//User wraps the get user handler to pass the dependency through.
func User(u Users) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(chi.URLParam(r, "id"))
		if err != nil {
			log.Error().Err(err).Msg("failed to get user id")

			w.WriteHeader(http.StatusBadRequest)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusBadRequest,
				Message: "failed to get user id",
				Details: err.Error(),
			}})
			if serr != nil {
				log.Error().Err(err).Msg("failed to json-encode a response")
			}
			return
		}

		user, err := u.User(id)
		if err != nil {
			log.
				Error().
				Err(err).
				RawJSON("stack", errors.RawJsonStack(err)).
				Msg("failed to get user")

			w.WriteHeader(http.StatusInternalServerError)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusInternalServerError,
				Message: "failed to get user",
				Details: errors.Stack(err),
			}})
			if serr != nil {
				log.Error().Err(err).Msg("failed to json-encode a response")
			}
			return
		}

		if user == nil {
			log.Error().Str("id", strconv.Itoa(id)).Msg("user not found")

			w.WriteHeader(http.StatusNotFound)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusNotFound,
				Message: "user not found",
			}})
			if serr != nil {
				log.Error().Err(err).Msg("failed to json-encode a response")
			}
			return
		}

		err = json.NewEncoder(w).Encode(Response{Result: user})
		if err != nil {
			log.Error().Err(err).Msg("failed to json-encode a response")
		}
	}
}

//Edit wraps the edit user handler to pass the dependency through.
func Edit(u Users) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(chi.URLParam(r, "id"))
		if err != nil {
			log.Error().Err(err).Msg("failed to get user id")

			w.WriteHeader(http.StatusBadRequest)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusBadRequest,
				Message: "failed to get user id",
				Details: err.Error(),
			}})
			if serr != nil {
				log.Error().Err(err).Msg("failed to json-encode a response")
			}
			return
		}

		req := new(editRequest)
		err = json.NewDecoder(r.Body).Decode(req)
		if err != nil {
			log.Error().Err(err).Msg("json-decode request")

			w.WriteHeader(http.StatusBadRequest)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusBadRequest,
				Message: "failed to json-decode request",
				Details: err.Error(),
			}})
			if serr != nil {
				log.Error().Err(serr).Msg("failed to json-encode a response")
			}
			return
		}

		user, err := u.Edit(id, req.Name)
		if err != nil {
			log.
				Error().
				Err(err).
				RawJSON("stack", errors.RawJsonStack(err)).
				Msg("failed to edit user")

			w.WriteHeader(http.StatusInternalServerError)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusInternalServerError,
				Message: "failed to edit user",
				Details: errors.Stack(err),
			}})
			if serr != nil {
				log.Error().Err(err).Msg("failed to json-encode a response")
			}
			return
		}

		if user == nil {
			log.Error().Str("id", strconv.Itoa(id)).Msg("user not found")

			w.WriteHeader(http.StatusNotFound)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusNotFound,
				Message: "user not found",
			}})
			if serr != nil {
				log.Error().Err(err).Msg("failed to json-encode a response")
			}
			return
		}

		err = json.NewEncoder(w).Encode(Response{Result: user})
		if err != nil {
			log.Error().Err(err).Msg("failed to json-encode a response")
		}
	}
}

//Delete wraps the delete user handler to pass the dependency through.
func Delete(u Users) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		w.Header().Set("Content-Type", "application/json")

		id, err := strconv.Atoi(chi.URLParam(r, "id"))
		if err != nil {
			log.Error().Err(err).Msg("failed to get user id")

			w.WriteHeader(http.StatusBadRequest)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusBadRequest,
				Message: "failed to get user id",
				Details: err.Error(),
			}})
			if serr != nil {
				log.Error().Err(err).Msg("failed to json-encode a response")
			}
			return
		}

		err = u.Delete(id)
		if err != nil {
			log.
				Error().
				Err(err).
				RawJSON("stack", errors.RawJsonStack(err)).
				Msg("failed to edit user")

			w.WriteHeader(http.StatusInternalServerError)

			serr := json.NewEncoder(w).Encode(Response{Error: &Error{
				Code:    http.StatusInternalServerError,
				Message: "failed to edit user",
				Details: errors.Stack(err),
			}})
			if serr != nil {
				log.Error().Err(err).Msg("failed to json-encode a response")
			}
			return
		}

		err = json.NewEncoder(w).Encode(Response{Result: true})
		if err != nil {
			log.Error().Err(err).Msg("failed to json-encode a response")
		}
	}
}
