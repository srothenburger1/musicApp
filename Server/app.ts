import MusicStatsService from "../Services/MusicStatsService.js"
import { v4 as uuid } from 'uuid';

const express = require('express'),
app = express(),
port = 3000,
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

let userData = {
    
};

app.get('/', (req, res) => res.send(
    "The list of options is /topsongs, /topartists, /allartistscount, /allsongscount"
    ))

function getLists(req){
    let path = req.body.path;
    let year = req.body.year;
    return MusicStatsService.createObj(path, year);
}

/*
    {
    id:123,
    path:./activity,
    year:2019,
} 
*/


app.post('/topsongs', (req,res)=> {
    const activity = getLists(req);
    res.send(activity.titlesSorted);
})

app.post('/topartists', (req,res)=> {
    const activity = getLists(req);
    res.send(activity.artistsSorted);
})

app.post('/allsongs', (req,res)=> {
    const activity = getLists(req);
    res.send(activity.uniqueTitles);
})

app.post('/allartists', (req,res)=> {
    const activity = getLists(req);
    res.send(activity.uniqueArtists);
})

app.post('/allsongscount', (req,res)=> {
    const activity = getLists(req);
    res.send(activity.uniqueTitles.length.toString());
})

app.post('/allartistscount', (req,res)=> {
    const activity = getLists(req);
    res.send(activity.uniqueTitles.length.toString());
})