class parse{
    //#region Properties
    rawJson = null;
    stringJson: string = null;

    uniqueTitles = [];
    uniqueArtists = [];

    titleCount = {};
    titleCount2 = {};

    artistCount = {};

    artistsSorted = [];
    titlesSorted = [];

    info = new Array;
    //#endregion

    //#region Constructors
    constructor(path:string){
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
    getJSON(path: string){
        let result = null;
        try{
             result = require(path);
        }catch(e){
            console.log(e);
        }
        return result;
    }
    parseJSON(){
     this.rawJson.forEach(element => {
         if(element.hasOwnProperty('title')){
            if(JSON.stringify(element).includes("2020") && JSON.stringify(element).includes("Listened to") ){
                this.info.push({title:JSON.stringify(element.title).slice(13,-1), artist:element.description});
            } 
         }
     });   
    }
    sortInfo(){
        this.info.forEach(item => {
            if(!this.uniqueArtists.includes(item.artist)){
                this.uniqueArtists.push(item.artist)
            }
            if(!this.uniqueTitles.includes(item.title)){
                this.uniqueTitles.push({title:item.title, artist:item.artist})
            }
        })
    }

    countTitlesIndividually(){
        this.info.forEach(item => {
            if(!this.titleCount2.hasOwnProperty(`${item.title} `)){
                this.titleCount2[`${item.title} `] = {};
                this.titleCount2[`${item.title} `][`${item.artist} `] = 1;
            }else{
                this.titleCount2[`${item.title} `][`${item.artist} `] += 1;
            }
        })
    }
    countTitles(){
        this.info.forEach(item => {
            // if the title count doesnt have the artist
            if(!this.titleCount.hasOwnProperty(item.artist))
            {
                // add the artist and first title
                this.titleCount[item.artist] = 
                {
                    titles: {}
                };              
                this.titleCount[item.artist].titles[item.title] = 1;
            }
            // else if title count -> artist doesnt contain the title
            else if(!this.titleCount[item.artist]["titles"].hasOwnProperty(item.title)){
                this.titleCount[item.artist].titles[item.title] = 1;
            }else if(this.titleCount[item.artist]["titles"].hasOwnProperty(item.title)){
                this.titleCount[item.artist].titles[item.title] += 1;
            }
        })
    }
    countArtist(){
        this.info.forEach(item=>{
            if(!this.artistCount.hasOwnProperty(`${item.artist} `)){
                this.artistCount[`${item.artist} `] = 1;
            }else{
                this.artistCount[`${item.artist} `] += 1;
            }
        })
    }
    getArtistsSorted(){
        var sortable = [];
        for (var item in this.artistCount) {
        sortable.push([item, this.artistCount[item]]);
        }

        sortable.sort(function(a, b) {
        return b[1] - a[1];
        });
        this.artistsSorted = sortable;
    }
    getTitlesSorted(){
        var sortable = [];
        for (var item in this.titleCount2) {
            //this needs to push the individual values of the nested object.
        sortable.push([item, this.titleCount2[item],this.titleCount2[item]]);
        }

        sortable.sort(function(a, b) {
        return b[2] - a[2];
        });
        this.titlesSorted = sortable;
    }
    //#endregion
}

let obj = new parse('./My Activity.json');

// console.log(obj.artistCount);
obj.getTitlesSorted();
console.log(obj.titlesSorted);