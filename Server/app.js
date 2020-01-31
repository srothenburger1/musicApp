"use strict";
exports.__esModule = true;
var MusicStatsService_js_1 = require("../Services/MusicStatsService.js");
var express = require('express');
// const data = require('../main.js');
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
// app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
var myActivity = MusicStatsService_js_1["default"].createObj('../My Activity.json', 2018);
app.get('/', function (req, res) { return res.send("The list of options is /topsongs, /topartists, /allartists, /allsongs, /allartistscount, /allsongscount"); });
function getLists(req) {
    var path = req.body.path;
    var year = req.body.year;
    return MusicStatsService_js_1["default"].createObj(path, year);
}
app.post('/topsongs', function (req, res) {
    /*
     {
        id:123,
        path:./activity,
        year:2019,
     }
     */
    var activity = getLists(req);
    res.send(activity.titlesSorted);
});
app.post('/topartists', function (req, res) {
    /*
     {
        id:123,
        path:./activity,
        year:2019,
     }
     */
    var activity = getLists(req);
    res.send(activity.artistsSorted);
});
app.post('/allsongs', function (req, res) {
    /*
     {
        id:123,
        path:./activity,
        year:2019,
     }
     */
    var activity = getLists(req);
    res.send(activity.uniqueTitles);
});
app.post('/allartists', function (req, res) {
    /*
     {
        id:123,
        path:./activity,
        year:2019,
     }
     */
    var activity = getLists(req);
    res.send(activity.uniqueArtists);
});
app.post('/allsongscount', function (req, res) {
    /*
     {
        id:123,
        path:./activity,
        year:2019,
     }
     */
    var activity = getLists(req);
    res.send(activity.uniqueTitles.length.toString());
});
app.post('/allartistscount', function (req, res) {
    /*
     {
        id:123,
        path:./activity,
        year:2019,
     }
     */
    var activity = getLists(req);
    res.send(activity.uniqueTitles.length.toString());
});
