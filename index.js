const { PORT, DBCONNECT } = require('./config.json')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const SongRoutes = express.Router()

let Song = require('./song.model')

app.use(bodyParser.json())
app.use(cors())
mongoose.connect(DBCONNECT, { useNewUrlParser: true, useUnifiedTopology: true })

const connection = mongoose.connection
connection.once('open', function() {
    console.log("Successful connection to MongoDB database")
})

/*          ROUTE SONG         */
SongRoutes.route('/list')
    .get((req, res) => {
        Song.find(function(err, list_song) {
            if (err) {
                res.send(err)
            } else {
                res.json(list_song)
            }
        })
    })

SongRoutes.route('/byID/:songName')
    .get((req, res) => {
        Song.find({songName: req.params.songName}, (err, song) => {
            if(err){
                res.send(err)
            } else if(song.length == 0) {
                res.send("No record found")
            }
            res.json(song)
        })
    })

SongRoutes.route('/add')
    .post((req, res) => {
        let song = new Song(req.body)
        console.log(song)
        song.save()
            .then(song => {
                res.status(200).json({'song': 'added successfully'})
                console.log('saved')
            })
            .catch(err => {
                res.status(400).json({'song': err})
                console.log('no saved')
            })
    })

app.use('/songs', SongRoutes)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT)
})
