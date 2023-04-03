const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let personSchema = Schema({
    name: {
        type: String,
        required: true
    },
    birthDate: Date,
    countryOfOrigin: String
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;