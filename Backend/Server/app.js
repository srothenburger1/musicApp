"use strict";
exports.__esModule = true;
var MusicStatsService_js_1 = require("../Services/MusicStatsService.js");
var express = require('express');
var app = express();
var cors = require('cors');
var port = 5000;
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    allowedHeaders: ["authorization", "Content-Type"],
    exposedHeaders: ["authorization"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
}));
var userData = {};
app.listen(port, function () { return console.log("Server listening on port " + port + "!"); });
// this route will take the users file, parse it, and store it in an array
app.post('/upload', upload.single('path'), function (req, res, next) {
    var payLoad;
    if (userData.hasOwnProperty(req.body.id)) {
        res.status(200).send("User data already in db");
    }
    else {
        payLoad = {
            id: req.body.id,
            file: req.file,
            year: req.body.year
        };
        fs.readFile(req.file.path, 'utf8', function (err, data) {
            if (err)
                throw err;
            payLoad.file = data;
            // add it to the userdata obj
            userData[req.body.id] = MusicStatsService_js_1["default"].createObj(payLoad);
            console.log(userData[req.body.id].titlesSorted, "userdata");
            console.log(userData);
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
