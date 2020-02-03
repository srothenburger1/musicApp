import MusicStatsService from "../Services/MusicStatsService.js"

const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const bodyParser = require('body-parser');
const FileReader = require('filereader');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(
    cors({
      allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
      exposedHeaders: ["authorization"], // you can change the headers
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false
    })
  );

app.listen(port, () => console.log(`Server listening on port ${port}!`))

app.post('/upload',upload.single('path'),function(req, res, next) {
    
    let payLoad = {
        id : req.body.id,
        path : req.file,
        year : req.body.year
    }

    // console.log(req)
    fs.readFile(req.file.path, 'utf8', function(err, data) {
    if (err) throw err;
    // console.log(data);
    payLoad.path = data
    MusicStatsService.creatObjFromObj(payLoad)
    })

      res.status(200).send("ok")

});


app.get('/', (req, res) => res.send(
    "The list of options is /topsongs, /topartists, /allartistscount, /allsongscount"
    ))
app.post('/yoy', (req,res)=> {
    res.status(200);
    console.log(req)
    res.send("good")
})
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

app.post('/allsongscount', (req,res)=> {
    const activity = getLists(req);
    res.send(activity.totalTitles);
})

app.post('/allartistscount', (req,res)=> {
    const activity = getLists(req);
    res.send(activity.totalArtists);
})