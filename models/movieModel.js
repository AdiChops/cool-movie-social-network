const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Person = require("./personModel");

let contributionSchema = Schema({
    person: Person.schema,
    role: String
});

// We create a schema for a movie
let movieSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    releaseYear: Number,
    genre: String,
    cast:[Person.schema],
    crew:[contributionSchema],
    plot: String,
    rating: {
        type: Number,
        validate: (val)=>{
            return val > 0 && val <= 5;
        }
    },
    coverArtUrl: String
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
