const mysql = require('mysql');

class Database {
  constructor() {
    this.connection = mysql.createConnection({
      host: "srv1151.hstgr.io",
      user: "u156584930_admin",
      password: "DeedBalancer10",
      database: "u156584930_Deed_Balancer"
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) {
          reject(error);
        } else {
          resolve(this.connection);
        }
      });
    });
  }

  query(sql, values) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  end() {
    return new Promise((resolve, reject) => {
      this.connection.end((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Database.getInstance();