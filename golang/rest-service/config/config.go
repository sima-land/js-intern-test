package config

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"time"
)

type ServerConfig struct {
	Port         string        `json:"port"`
	ReadTimeout  time.Duration `json:"write_timeout"`
	WriteTimeout time.Duration `json:"read_timeout"`
}

var Config ServerConfig

func init() {
	config := new(ServerConfig)
	raw, err := ioutil.ReadFile("./config.json")
	if err != nil {
		log.Fatal(err)
	}
	err = json.Unmarshal(raw, config)
	if err != nil {
		log.Fatal("Configuration error:", err)
	}
	Config = *config
}
