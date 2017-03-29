"use strict";
exports.__esModule = true;
var mysql_1 = require("mysql");
var Tasks = (function () {
    function Tasks(dbConf) {
        this.db = mysql_1["default"].createConnection(dbConf);
        this.db.connect(function (err) {
            if (err) {
                console.log('error in connection:' + err.stack);
            }
            return;
        });
    }
    Tasks.prototype.getTable = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.db.query("SELECT * FROM " + name + ";", function (error, res) {
                resolve(res);
                console.log('query error: ' + error);
                reject(error);
            });
        });
    };
    return Tasks;
}());
exports["default"] = Tasks;
