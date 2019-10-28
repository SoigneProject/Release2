var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postTagsSchema = new Schema({tagName: String});


var PostSchema = new Schema({
    title: {
        type: String
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    username: { //change this to a user // user
        type: String
    },
    photo: {
        //should be a jpeg 
        type: String,
        required: "Please select a picture for your post"
    },
    tags: [postTagsSchema]
});
module.exports = mongoose.model('Post', PostSchema);
