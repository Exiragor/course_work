"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
var tasks_1 = require("../tasks");
var config_1 = require("../config");
var task = new tasks_1["default"](config_1["default"].dbConfig);
router.get('/test', function (req, res) {
    task.getTable('test')
        .then(function (result) {
        res.json(result);
    })["catch"](function (err) {
        console.log(err);
    });
});
exports["default"] = router;
