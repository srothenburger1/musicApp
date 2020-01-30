class parse{
    rawJson = null;
    stringJson: string = null;

    uniqueTitles = [];
    uniqueArtists = [];

    titleCount = {};
    artistCount = [];

    info = new Array;
    
    constructor(path:string){
        this.rawJson = this.getJSON(path);
        this.stringJson = JSON.stringify(this.rawJson);
        this.parseJSON();
        this.sortInfo();
        this.countTitles();        
    }

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
    
}

let obj = new parse('./My Activity.json');



console.log(obj.titleCount);