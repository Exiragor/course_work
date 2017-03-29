"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path = require("path");
var consolidate_1 = require("consolidate");
var api_1 = require("./routes/api");
var app = express_1["default"]();
app.engine('hbs', consolidate_1["default"].handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use('/public', express_1["default"].static(path.join(__dirname + '/public')));
app.use('/api', api_1["default"]);
app.get('*', function (req, res) {
    res.render('index');
});
exports["default"] = app;
