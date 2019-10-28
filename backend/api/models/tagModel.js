const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: {
        type: String,
        required: [true, "The name of the tag is required"]
    }
});

module.exports = mongoose.model('Tag', TagSchema);