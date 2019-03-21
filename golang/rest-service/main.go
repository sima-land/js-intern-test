package main

import (
	"database/sql"
	"flag"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/krocos/errors"
	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/zerolog/log"

	"github.com/sima-land/intern-test/golang/rest-service/http/handler"
	"github.com/sima-land/intern-test/golang/rest-service/storage/sqlite"
	"github.com/sima-land/intern-test/golang/rest-service/users"
)

var (
	version = ""
	build   = ""
)

func main() {
	log.Logger = log.Logger.With().Str("version", version).Str("build", build).Logger()

	path := flag.String("path", "data/database.sqlite", "Path to an sqlite database file")
	init := flag.Bool("init", false, "Do we need to init a database schema?")
	listen := flag.String("listen", ":8080", "The address to listen on")

	flag.Parse()

	db, err := sql.Open("sqlite3", *path)
	if err != nil {
		log.
			Fatal().
			Err(err).
			Str("path", *path).
			Msg("open a database connection")
	}

	s := sqlite.New(db)

	if *init {
		err = s.InitStructure()
		if err != nil {
			log.
				Fatal().
				Err(err).
				Str("path", *path).
				RawJSON("stack", errors.RawJsonStack(err)).
				Msg("failed to init the database structure")
		}
	}

	u := users.New(s)

	r := chi.NewRouter()

	r.Post("/user", handler.Create(u))
	r.Get("/users/{id}", handler.User(u))
	r.Put("/users/{id}", handler.Edit(u))
	r.Delete("/users/{id}", handler.Delete(u))

	log.Info().Msg("starting...")

	log.
		Fatal().
		Err(http.ListenAndServe(*listen, r)).
		Msg("failed to still serve")
}
