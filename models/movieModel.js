const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// We create a schema for a movie
let movieSchema = Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        validator: function(v) {
                return v.length > 3;
            }
        
    },
    releaseYear: Number
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
