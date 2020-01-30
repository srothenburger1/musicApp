import MusicStats from "../main.js"

const express = require('express')
// const data = require('../main.js');
const app = express()
const port = 3000

let myActivity = new MusicStats('./My Activity.json', 2019);

app.get('/', (req, res) => res.send("The list of options is /topsongs, /topartists, /allartists, /allsongs, /allartistscount, /allsongscount"))

app.get('/topsongs', (req, res) => res.send(myActivity.titlesSorted))

app.get('/topartists', (req, res) => res.send(myActivity.artistsSorted))

app.get('/allartists', (req, res) => res.send(myActivity.uniqueArtists))
app.get('/allartistscount', (req, res) => res.send(myActivity.uniqueArtists.length.toString()))


app.get('/allsongs', (req, res) => res.send(myActivity.uniqueTitles))
app.get('/allsongscount', (req, res) => res.send(myActivity.uniqueTitles.length.toString()))



app.listen(port, () => console.log(`Example app listening on port ${port}!`))