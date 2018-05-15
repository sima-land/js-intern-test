package router

import (
	"net/http"
	"users/utils"

	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	mux := mux.NewRouter()
	for _, route := range routes {
		var handler http.Handler

		handler = route.HandlerFunc
		handler = utils.Logger(handler, route.Name)

		mux.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}
	return mux
}
