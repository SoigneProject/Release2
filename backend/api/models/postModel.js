var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postTagsSchema = new Schema({tagName: String});
const postItemsSchema = new Schema({itemName: String});


var PostSchema = new Schema({
    title: {
        type: String
    },
    username: {
        type: String
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String
    },
    photo: {
        //should be a jpeg 
        type: String,
        required: "Please select a picture for your post"
    },
    photo_id: {
        type: String
    },
    tags: [postTagsSchema],
    items: [postItemsSchema]
});
module.exports = mongoose.model('Post', PostSchema);
