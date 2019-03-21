package main

import (
	"database/sql"
	"flag"
	"log"
	"net/http"

	"github.com/go-chi/chi"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"

	"github.com/sima-land/intern-test/golang/rest-service/http/handler"
	"github.com/sima-land/intern-test/golang/rest-service/storage/sqlite"
	"github.com/sima-land/intern-test/golang/rest-service/users"
)

func main() {
	path := flag.String("path", "data/database.sqlite", "Path to an sqlite database file")
	init := flag.Bool("init", false, "Do we need to init a database schema?")

	flag.Parse()

	db, err := sql.Open("sqlite3", *path)
	if err != nil {
		log.Fatalf("open a database connection: %v", err)
	}

	s := sqlite.New(db)

	if *init {
		err = s.InitStructure()
		if err != nil {
			log.Fatalf("init a database structure: %v", err)
		}
	}

	u := users.New(s)

	r := chi.NewRouter()

	r.Post("/user", handler.Create(u))
	r.Get("/users/{id}", handler.User(u))
	r.Put("/users/{id}", handler.Edit(u))
	r.Delete("/users/{id}", handler.Delete(u))

	log.Fatalf("failed to still serve: %v", http.ListenAndServe(":8080", r))
}
