var parse = /** @class */ (function () {
    //#endregion
    //#region Constructors
    function parse(path) {
        //#region Properties
        this.rawJson = null;
        this.stringJson = null;
        this.uniqueTitles = [];
        this.uniqueArtists = [];
        this.titleCount = {};
        this.titleCount2 = {};
        this.artistCount = {};
        this.artistsSorted = [];
        this.titlesSorted = [];
        this.info = new Array;
        this.rawJson = this.getJSON(path);
        this.stringJson = JSON.stringify(this.rawJson);
        this.parseJSON();
        this.sortInfo();
        this.countTitles();
        this.countArtist();
        this.getArtistsSorted();
        this.countTitlesIndividually();
    }
    //#endregion
    //#region Methods
    parse.prototype.getJSON = function (path) {
        var result = null;
        try {
            result = require(path);
        }
        catch (e) {
            console.log(e);
        }
        return result;
    };
    parse.prototype.parseJSON = function () {
        var _this = this;
        this.rawJson.forEach(function (element) {
            if (element.hasOwnProperty('title')) {
                if (JSON.stringify(element).includes("2020") && JSON.stringify(element).includes("Listened to")) {
                    _this.info.push({ title: JSON.stringify(element.title).slice(13, -1), artist: element.description });
                }
            }
        });
    };
    parse.prototype.sortInfo = function () {
        var _this = this;
        this.info.forEach(function (item) {
            if (!_this.uniqueArtists.includes(item.artist)) {
                _this.uniqueArtists.push(item.artist);
            }
            if (!_this.uniqueTitles.includes(item.title)) {
                _this.uniqueTitles.push({ title: item.title, artist: item.artist });
            }
        });
    };
    parse.prototype.countTitlesIndividually = function () {
        var _this = this;
        this.info.forEach(function (item) {
            if (!_this.titleCount2.hasOwnProperty(item.title + " ")) {
                _this.titleCount2[item.title + " "] = {};
                _this.titleCount2[item.title + " "][item.artist + " "] = 1;
            }
            else {
                _this.titleCount2[item.title + " "][item.artist + " "] += 1;
            }
        });
    };
    parse.prototype.countTitles = function () {
        var _this = this;
        this.info.forEach(function (item) {
            // if the title count doesnt have the artist
            if (!_this.titleCount.hasOwnProperty(item.artist)) {
                // add the artist and first title
                _this.titleCount[item.artist] =
                    {
                        titles: {}
                    };
                _this.titleCount[item.artist].titles[item.title] = 1;
            }
            // else if title count -> artist doesnt contain the title
            else if (!_this.titleCount[item.artist]["titles"].hasOwnProperty(item.title)) {
                _this.titleCount[item.artist].titles[item.title] = 1;
            }
            else if (_this.titleCount[item.artist]["titles"].hasOwnProperty(item.title)) {
                _this.titleCount[item.artist].titles[item.title] += 1;
            }
        });
    };
    parse.prototype.countArtist = function () {
        var _this = this;
        this.info.forEach(function (item) {
            if (!_this.artistCount.hasOwnProperty(item.artist + " ")) {
                _this.artistCount[item.artist + " "] = 1;
            }
            else {
                _this.artistCount[item.artist + " "] += 1;
            }
        });
    };
    parse.prototype.getArtistsSorted = function () {
        var sortable = [];
        for (var item in this.artistCount) {
            sortable.push([item, this.artistCount[item]]);
        }
        sortable.sort(function (a, b) {
            return b[1] - a[1];
        });
        this.artistsSorted = sortable;
    };
    parse.prototype.getTitlesSorted = function () {
        var sortable = [];
        for (var item in this.titleCount2) {
            sortable.push([item, this.titleCount2[item].key, this.titleCount2[item].value]);
        }
        sortable.sort(function (a, b) {
            return b[2] - a[2];
        });
        this.titlesSorted = sortable;
    };
    return parse;
}());
var obj = new parse('./My Activity.json');
// console.log(obj.artistCount);
obj.getTitlesSorted();
console.log(obj.titlesSorted);
