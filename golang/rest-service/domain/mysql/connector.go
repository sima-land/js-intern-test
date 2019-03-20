package mysql

import (
	"database/sql"
	. "github.com/kostyaBro/intern-test/golang/rest-service/config"
	. "github.com/kostyaBro/intern-test/golang/rest-service/domain/i"
	"log"
	"strconv"
)

type mySqlConnector struct {
	connector *sql.DB
}

var instance *mySqlConnector

func GetInstance() IRepositoryCombiner {
	db, err := sql.Open("mysql", MySqlUser+":"+MySqlPass+
		"@tcp("+MySqlHost+":"+strconv.Itoa(MySqlPort)+")/"+MySqlName+"?parseTime=true")
	if err != nil {
		log.Printf("ERR mysql.GetInstance err %s", err.Error())
	}
	instance = &mySqlConnector{
		connector: db,
	}
	return instance
}
