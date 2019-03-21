package main

import (
	"database/sql"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/koding/multiconfig"
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

//Config represents the service configuration structure.
type Config struct {
	Service struct {
		Listen string `json:"listen" yaml:"listen" default:":8080"`
	} `json:"service" yaml:"service"`
	Database struct {
		Init bool   `json:"init" yaml:"init" default:"false"`
		Path string `json:"path" yaml:"path" default:"data/database.sqlite"`
	} `json:"database" yaml:"database"`
}

func main() {
	log.Logger = log.Logger.With().Str("version", version).Str("build", build).Logger()

	config := new(Config)

	mconf := multiconfig.NewWithPath("config/config.yml")
	err := mconf.Load(config)
	if err != nil {
		log.
			Fatal().
			Err(err).
			Msg("failed to load configuration")
	}

	db, err := sql.Open("sqlite3", config.Database.Path)
	if err != nil {
		log.
			Fatal().
			Err(err).
			Str("path", config.Database.Path).
			Msg("open a database connection")
	}

	s := sqlite.New(db)

	if config.Database.Init {
		err = s.InitStructure()
		if err != nil {
			log.
				Fatal().
				Err(err).
				Str("path", config.Database.Path).
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
		Err(http.ListenAndServe(config.Service.Listen, r)).
		Msg("failed to still serve")
}
