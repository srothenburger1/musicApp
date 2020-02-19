import MusicStatsService from "../Services/MusicStatsService.js"

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' })
const app = express();
const port: number = 5000;

let userData;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"],
      exposedHeaders: ["authorization"], 
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
  );

app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

app.listen(port, () => console.log(`Server running on port ${port}!`))

app.post('/upload',upload.single('path'),(
        req:{body:{id:string, year:string},file:{path:string}}
        , res:{status:Function, send:Function}
        , next: any
        ) => {
        let payLoad: {id:string, file:string, year:string} = {
            id : req.body.id,
            file : '',
            year : req.body.year
        }

    fs.readFile(req.file.path, 'utf8', (err: ExceptionInformation, data:string) => {
        if (err) throw err;
        payLoad.file = data
        userData = MusicStatsService.createObj(payLoad)
        userData === null ? res.status(400).send(null): res.status(200).send(userData);
        })
} 
);

app.get('/', (req:object, res:{send:Function}) => res.send(
    "The list of options is /topsongs, /topartists, /allartistscount, /allsongscount"
    ))

app.post('/topsongs', (req:{body:{id:string}},res:{send:Function})=> {
    res.send(userData[req.body.id].titlesSorted);
})

app.post('/topartists', (req:{body:{id:string}},res:{send:Function})=> {
    res.send(userData[req.body.id].artistsSorted);
})

app.post('/allsongscount', (req:{body:{id:string}},res:{send:Function})=> {
    res.send(userData[req.body.id].totalTitles);
})

app.post('/allartistscount', (req:{body:{id:string}},res:{send:Function})=> {
    res.send(userData[req.body.id].totalArtists);
})