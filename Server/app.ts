import MusicStatsService from "../Services/MusicStatsService.js"

const express = require('express')
// const data = require('../main.js');
const app = express();
const port = 3000

app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());

let myActivity = MusicStatsService.createObj('../My Activity.json', 2018);

app.get('/', (req, res) => res.send("The list of options is /topsongs, /topartists, /allartists, /allsongs, /allartistscount, /allsongscount"))

app.post('/topsongs', (req,res)=> {
    /*
     {
        id:123,
        path:./activity,
        year:2019,
     } 
     */
    let path = req.body.path;
    let year = req.body.year;
})

app.get('/topsongs', (req, res) => res.send(myActivity.titlesSorted))

app.get('/topartists', (req, res) => res.send(myActivity.artistsSorted))

app.get('/allartists', (req, res) => res.send(myActivity.uniqueArtists))
app.get('/allartistscount', (req, res) => res.send(myActivity.uniqueArtists.length.toString()))


app.get('/allsongs', (req, res) => res.send(myActivity.uniqueTitles))
app.get('/allsongscount', (req, res) => res.send(myActivity.uniqueTitles.length.toString()))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))