import MusicStatsService from "../Services/MusicStatsService.js"

const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
const bodyParser = require('body-parser');
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

  let userData={};

app.listen(port, () => console.log(`Server listening on port ${port}!`))


// this route will take the users file, parse it, and store it in an array
app.post('/upload',upload.single('path'),function(req, res, next) {
    let payLoad;

    if(userData.hasOwnProperty(req.body.id)){
        res.status(200).send("User data already in db")
    }else{

    payLoad = {
        id : req.body.id,
        file : req.file,
        year : req.body.year
    }

    fs.readFile(req.file.path, 'utf8', function(err, data) {
        if (err) throw err;
        payLoad.file = data
        // add it to the userdata obj
        userData[req.body.id] = MusicStatsService.createObj(payLoad)
        console.log(userData[req.body.id].titlesSorted,"userdata")
        console.log(userData)
        })

        res.status(200).send("User data uploaded")
}
      
});

app.get('/', (req, res) => res.send(
    "The list of options is /topsongs, /topartists, /allartistscount, /allsongscount"
    ))

app.post('/topsongs', (req,res)=> {
    res.send(userData[req.body.id].titlesSorted);
})

app.post('/topartists', (req,res)=> {
    res.send(userData[req.body.id].artistsSorted);
})

app.post('/allsongscount', (req,res)=> {
    res.send(userData[req.body.id].totalTitles);
})

app.post('/allartistscount', (req,res)=> {
    res.send(userData[req.body.id].totalArtists);
})