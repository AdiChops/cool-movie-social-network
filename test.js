const express = require('express');
const mongoose = require('mongoose');

const path = require('path');

const app = express();

const Movie = require("./models/movieModel");
const Person = require("./models/personModel");
const port = 3000;

app.set('views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// C-Create, R-Read, U-Update, D-Delete

// REST - Representational State Transfer
// GET - Read
// POST - Create
// PUT - Update
// DELETE - Delete
app.get('/', (request, response) => {


    response.render('index', {jobTitle: 'Software Engineer', numbers: [1,2,3,4,5,6,7,65,4]});    
});

app.get("/addMovie", (request, response) => {
    response.render("addMovie");
});

app.put('/movies/:id', (request, response)=>{
    response.send("Movie updated!")
})
app.post('/movies', (request, response) => {
    let newMovie = new Movie(request.body);
    newMovie.save((error, movie) => {
        if (error) {
            console.log(error);
        } else {
            console.log(movie);
        }
    });
    response.send("Movie added!")
});

app.delete('/movies/:id', (request, response) => {
    response.send("Movie deleted!")
});
// GET /movies/123
app.get('/movies', (request, response) => {
    let query = {};
    if(request.query.title) {
        query["title"] = request.query.title;
    }
    Movie.find(query, (error, movies) => {
        if (error) {
            console.log(error);
        } else {
            console.log(movies);
            response.render('favouriteMovies', {movies: movies});

        }
    });
});

app.get('/movies/:id', (request, response) => {
    Movie.findById(request.params.id, (error, movie) => {
        if (error) {
            console.log(error);
        } else {
            console.log(movie);
            response.render('favouriteMovies', {movies: [movie]});
        }
    })
});

app.get("/addPerson", (req, res)=>{
    res.render("addPerson");
})

app.post("/persons", (req, res)=>{
    let newPer = Person(req.body);
    newPer.save((err)=>{
        if(err){
            res.status(500);
            res.send("error!");
        }
        res.send(201);
        res.send("saved successfully!");
    });
})


app.get(["/test", "/testPage"], (request, response) => {
    response.format({
        'text/html': function(){
            response.send('<h1>Hello World!</h1>');
        },
        'text/plain': function(){
            response.send('Hello World!');
        },
        'application/json': function(){
            response.send({ message: 'Hello World!' });
        },
        'default': function() {
            // log the request and respond with 406
            response.status(406).send('Not Acceptable');
        }
    });
});

// GET /products/123

// HTTP 1.1
// GET /test

mongoose.connect('mongodb://127.0.0.1/moviedb', {useNewUrlParser: true, useUnifiedTopology:true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to database'));
db.once('open', function() {
	app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
