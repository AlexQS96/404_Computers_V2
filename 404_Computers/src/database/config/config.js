module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "404computers",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port":"3306"
  },
  "test": {
    "username": "user404test",
    "password": 1234,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "user404prod",
    "password": 1234,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
