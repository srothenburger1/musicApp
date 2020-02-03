"use strict";
exports.__esModule = true;
var MusicStatsService_js_1 = require("../Services/MusicStatsService.js");
var express = require('express');
var app = express();
var cors = require('cors');
var port = 5000;
var bodyParser = require('body-parser');
var FileReader = require('filereader');
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
app.listen(port, function () { return console.log("Server listening on port " + port + "!"); });
app.post('/upload', upload.single('path'), function (req, res, next) {
    var payLoad = {
        id: req.body.id,
        path: req.file,
        year: req.body.year
    };
    // console.log(req)
    fs.readFile(req.file.path, 'utf8', function (err, data) {
        if (err)
            throw err;
        // console.log(data);
        payLoad.path = data;
        MusicStatsService_js_1["default"].creatObjFromObj(payLoad);
    });
    res.status(200).send("ok");
});
app.get('/', function (req, res) { return res.send("The list of options is /topsongs, /topartists, /allartistscount, /allsongscount"); });
app.post('/yoy', function (req, res) {
    res.status(200);
    console.log(req);
    res.send("good");
});
function getLists(req) {
    var path = req.body.path;
    var year = req.body.year;
    return MusicStatsService_js_1["default"].createObj(path, year);
}
/*
    {
    id:123,
    path:./activity,
    year:2019,
}
*/
app.post('/topsongs', function (req, res) {
    var activity = getLists(req);
    res.send(activity.titlesSorted);
});
app.post('/topartists', function (req, res) {
    var activity = getLists(req);
    res.send(activity.artistsSorted);
});
app.post('/allsongscount', function (req, res) {
    var activity = getLists(req);
    res.send(activity.totalTitles);
});
app.post('/allartistscount', function (req, res) {
    var activity = getLists(req);
    res.send(activity.totalArtists);
});
