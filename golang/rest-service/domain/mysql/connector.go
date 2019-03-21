package mysql

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql" // this is driver for mysql
	"github.com/kostyaBro/intern-test/golang/rest-service/config"
	di "github.com/kostyaBro/intern-test/golang/rest-service/domain/i"
	"log"
	"strconv"
)

type mySQLConnector struct {
	connector *sql.DB
}

var instance *mySQLConnector

// GetInstance is function for grt instance of singleton
func GetInstance() di.IRepositoryCombiner {
	db, err := sql.Open("mysql", config.MySQLUser+":"+config.MySQLPass+
		"@tcp("+config.MySQLHost+":"+strconv.Itoa(config.MySQLPort)+")/"+config.MySQLName+"?parseTime=true")
	if err != nil {
		log.Printf("ERR mysql.GetInstance err %s", err.Error())
	}
	instance = &mySQLConnector{
		connector: db,
	}
	return instance
}
