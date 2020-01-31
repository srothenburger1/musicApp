"use strict";
exports.__esModule = true;
var MusicStatsService = /** @class */ (function () {
    // re-enable getters when i figure out the compiler issues.
    // public get UniqueTitles() : Array<any> {
    //     return this.uniqueTitles;
    // }
    // public get UniqueArtists() : Array<any> {
    //     return this.uniqueArtists;
    // }
    // public get TitleCount() : Object {
    //     return this.TitleCount;
    // }
    // public get ArtistCount() : Object {
    //     return this.artistCount;
    // }
    //#endregion
    //#region Constructors
    function MusicStatsService(path, year) {
        //#region Properties
        this.rawJson = null;
        this.stringJson = null;
        this.uniqueTitles = [];
        this.uniqueArtists = [];
        this.titleCount = {};
        this.artistCount = {};
        this.artistsSorted = [];
        this.titlesSorted = [];
        this.data = new Array();
        this.rawJson = this.getJSON(path);
        this.stringJson = JSON.stringify(this.rawJson);
        this.parseJSON(year);
        this.init();
    }
    MusicStatsService.prototype.init = function () {
        this.sortInfo();
        this.countArtist();
        this.getArtistsSorted();
        this.countTitles();
        this.getTitlesSorted();
    };
    MusicStatsService.createObj = function (path, year) {
        var statsObj = new MusicStatsService(path, year);
        var activity = {
            uniqueTitles: statsObj.uniqueTitles,
            uniqueArtists: statsObj.uniqueArtists,
            titleCount: statsObj.titleCount,
            artistCount: statsObj.artistCount,
            artistsSorted: statsObj.artistsSorted,
            titlesSorted: statsObj.titlesSorted
        };
        return activity;
    };
    //#endregion
    //#region Methods
    MusicStatsService.prototype.getJSON = function (path) {
        var result = null;
        try {
            result = require(path);
        }
        catch (e) {
            console.log(e);
        }
        return result;
    };
    MusicStatsService.prototype.parseJSON = function (year) {
        var _this = this;
        var yearVar = year.toString();
        this.rawJson.forEach(function (element) {
            if (element.hasOwnProperty('title')) {
                if (JSON.stringify(element).includes(yearVar) && JSON.stringify(element).includes('Listened to')) {
                    _this.data.push({ title: JSON.stringify(element.title).slice(13, -1), artist: element.description });
                }
            }
        });
    };
    MusicStatsService.prototype.sortInfo = function () {
        var _this = this;
        this.data.forEach(function (item) {
            if (!_this.uniqueArtists.includes(item.artist)) {
                _this.uniqueArtists.push(item.artist);
            }
            if (!_this.uniqueTitles.includes(item.title)) {
                _this.uniqueTitles.push({ title: item.title, artist: item.artist });
            }
        });
    };
    MusicStatsService.prototype.countTitles = function () {
        var _this = this;
        this.data.forEach(function (item) {
            if (!_this.titleCount.hasOwnProperty(item.title + " ")) {
                _this.titleCount[item.title + " "] = [item.artist + " ", 1];
            }
            else {
                _this.titleCount[item.title + " "][1] += 1;
            }
        });
    };
    // @deprecated as there is a better way to do this
    // countTitles(){
    //     this.info.forEach(item => {
    //         // if the title count doesnt have the artist
    //         if(!this.titleCount.hasOwnProperty(item.artist))
    //         {
    //             // add the artist and first title
    //             this.titleCount[item.artist] =
    //             {
    //                 titles: {}
    //             };
    //             this.titleCount[item.artist].titles[item.title] = 1;
    //         }
    //         // else if title count -> artist doesnt contain the title
    //         else if(!this.titleCount[item.artist]["titles"].hasOwnProperty(item.title)){
    //             this.titleCount[item.artist].titles[item.title] = 1;
    //         }else if(this.titleCount[item.artist]["titles"].hasOwnProperty(item.title)){
    //             this.titleCount[item.artist].titles[item.title] += 1;
    //         }
    //     })
    // }
    MusicStatsService.prototype.countArtist = function () {
        var _this = this;
        this.data.forEach(function (item) {
            _this.artistCount[item.artist + " "] = !_this.artistCount.hasOwnProperty(item.artist + " ")
                ? 1
                : _this.artistCount[item.artist + " "] + 1;
        });
    };
    MusicStatsService.prototype.getArtistsSorted = function () {
        var sortable = [];
        for (var item in this.artistCount) {
            sortable.push([item, this.artistCount[item]]);
        }
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        sortable.length = 20;
        this.artistsSorted = sortable;
    };
    MusicStatsService.prototype.getTitlesSorted = function () {
        var sortable = [];
        for (var item in this.titleCount) {
            sortable.push([item, this.titleCount[item][0], this.titleCount[item][1]]);
        }
        sortable.sort(function (a, b) {
            return b[2] - a[2];
        });
        sortable.length = 25;
        this.titlesSorted = sortable;
    };
    return MusicStatsService;
}());
exports["default"] = MusicStatsService;
