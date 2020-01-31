"use strict";
exports.__esModule = true;
var MusicStatsService_js_1 = require("../Services/MusicStatsService.js");
var express = require('express'), app = express(), port = 3000, bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(port, function () { return console.log("Example app listening on port " + port + "!"); });
var userData = {};
app.get('/', function (req, res) { return res.send("The list of options is /topsongs, /topartists, /allartistscount, /allsongscount"); });
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
app.post('/allsongs', function (req, res) {
    var activity = getLists(req);
    res.send(activity.uniqueTitles);
});
app.post('/allartists', function (req, res) {
    var activity = getLists(req);
    res.send(activity.uniqueArtists);
});
app.post('/allsongscount', function (req, res) {
    var activity = getLists(req);
    res.send(activity.uniqueTitles.length.toString());
});
app.post('/allartistscount', function (req, res) {
    var activity = getLists(req);
    res.send(activity.uniqueTitles.length.toString());
});
