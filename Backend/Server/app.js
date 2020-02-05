"use strict";
exports.__esModule = true;
var MusicStatsService_js_1 = require("../Services/MusicStatsService.js");
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var upload = multer({ dest: 'uploads/' });
var app = express();
var port = 5000;
var userData = new Object();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: ["authorization"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.listen(port, function () { return console.log("Server running on port " + port + "!"); });
app.post('/upload', upload.single('path'), function (req, res) {
    if (userData.hasOwnProperty(req.body.id)) {
        res.status(200).send("User data already in db");
    }
    else {
        var payLoad_1 = {
            id: req.body.id,
            file: '',
            year: req.body.year
        };
        fs.readFile(req.file.path, 'utf8', function (err, data) {
            if (err)
                throw err;
            payLoad_1.file = data;
            // add it to the userdata obj
            userData[req.body.id] = MusicStatsService_js_1["default"].createObj(payLoad_1);
            console.log(userData[req.body.id].titlesSorted, "titles sorted");
        });
        res.status(200).send("User data uploaded");
    }
});
app.get('/', function (req, res) { return res.send("The list of options is /topsongs, /topartists, /allartistscount, /allsongscount"); });
app.post('/topsongs', function (req, res) {
    res.send(userData[req.body.id].titlesSorted);
});
app.post('/topartists', function (req, res) {
    res.send(userData[req.body.id].artistsSorted);
});
app.post('/allsongscount', function (req, res) {
    res.send(userData[req.body.id].totalTitles);
});
app.post('/allartistscount', function (req, res) {
    res.send(userData[req.body.id].totalArtists);
});
