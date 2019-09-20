const mongoose = require("mongoose");

// this will be our data base's data structure 
const DataSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// export the new Schema so we could modify it using Node.js
var Data = module.exports = mongoose.model("Data", DataSchema);
module.exports.get = function (callback, limit) {
    Data.find(callback).limit(limit);
}