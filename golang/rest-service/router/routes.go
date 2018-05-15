package router

import (
	"net/http"
	"users/handlers"
)

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"CreateUser",
		"POST",
		"/user/create",
		handlers.CreateUser,
	},
	Route{
		"GetUser",
		"GET",
		"/user/{userID:[0-9]+}",
		handlers.GetUser,
	},
	Route{
		"UpdateUser",
		"PUT",
		"/user/{userID:[0-9]+}",
		handlers.UpdateUser,
	},
	Route{
		"DeleteUser",
		"DELETE",
		"/user/{userID:[0-9]+}",
		handlers.DeleteUser,
	},
}
