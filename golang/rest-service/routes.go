package main

import (
	"net/http"

	"github.com/formiat/intern-test/golang/rest-service/handlers"
	"github.com/gorilla/mux"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

var (
	indexRoute = Route{
		Name:        "index",
		Method:      "GET",
		Pattern:     "/",
		HandlerFunc: handlers.Index,
	}
	operationRoutes = map[string][]Route{
		"users": {
			Route{
				Name:        "getUser",
				Method:      "GET",
				Pattern:     "/{id:[0-9]+}",
				HandlerFunc: handlers.GetUser,
			},
			Route{
				Name:        "createUser",
				Method:      "POST",
				Pattern:     "/create",
				HandlerFunc: handlers.CreateUser,
			},
			Route{
				Name:        "updateUser",
				Method:      "POST",
				Pattern:     "/{id:[0-9]+}/update",
				HandlerFunc: handlers.UpdateUser,
			},
			Route{
				Name:        "deleteUser",
				Method:      "POST",
				Pattern:     "/{id:[0-9]+}/delete",
				HandlerFunc: handlers.DeleteUser,
			},
		},
	}
)

func NewRouter() *mux.Router {

	router := mux.NewRouter()
	router.NotFoundHandler = http.HandlerFunc(handlers.NotFound)
	router.
		Methods(indexRoute.Method).
		Path(indexRoute.Pattern).
		Name(indexRoute.Name).
		Handler(indexRoute.HandlerFunc)
	for node, routes := range operationRoutes {
		for _, route := range routes {
			router.PathPrefix("/" + node).Subrouter().
				Methods(route.Method).
				Path(route.Pattern).
				Name(route.Name).
				Handler(route.HandlerFunc)
		}
	}

	return router
}
