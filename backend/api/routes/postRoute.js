/*
 * Parent Route: /posts
 */
const express = require('express');
const router = express.Router();
const PostModel = require('../models/postModel');
const multiPart = require('connect-multiparty');
const multiPartMiddleware = multiPart();
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'soigne-pix',
    api_key: '472288961331361',
    api_secret: 'VylP7m3EhxWbbzWEE8NBAcbcxKs'
});

// Get all posts
router.get('/', function (req, res) {
    PostModel.find((err, post) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            postObj: post
        });
    });
})

// Get post with id
router.get('/id/:id', function (req, res) {
    // Get a user
    var queryID = req.params.id;
    PostModel.findById({
        _id: queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Get all posts with name
router.get('/title/:title', function (req, res) {
    var queryTitle = req.params.title;
    PostModel.find({
        title: queryTitle
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Create a post
router.post('/', multiPartMiddleware, function (req, res) {
    console.log(req.body);
    const {
        title,
        description,
        photo
    } = req.body;

    var result = cloudinary.uploader.upload(photo);
    console.log(result);
    let post = new PostModel();
    if (!title || !description)
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });

    var ourDate = new Date();
    ourDate.setHours(ourDate.getHours() + 7);
    post.dateTime = ourDate;
    post.title = title;
    post.description = description;
    post.photo = result.url;
    post.photo_id = result.public_id;
    // we need to find a way to link the user
    // Get the current user from cookies

    post.save((err) => {
        if (err) return res.json({
            created: false,
            error: err
        });
        return res.json({
            title: title,
            dateTime: ourDate,
            description: description,
            photo: result.url,
            photo_id: result.public_id,
            created: true
        });
    });
})

// Update a post
router.put('/id/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    PostModel.findOneAndUpdate({
        _id: queryID
    }, body, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            post: body
        });
    });
})

// Delete a post
router.delete('/id/:id', function (req, res) {
    var queryID = req.params.id;
    PostModel.findOneAndDelete({
        _id: queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// //this is for tags
// app.route('/posts/addTag/:id').put(post_controller.add_a_tag_to_post);
// app.route('/posts/removeTag/:id').put(post_controller.remove_a_tag_from_post);
// };

// Add a tag to post by id
router.put('/addTag/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var tagToAdd = body.tagName;
    var tagObj = {
        "tagName": tagToAdd
    };
    PostModel.findOneAndUpdate({
        _id: queryID
    }, {
        $push: {
            tags: tagObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            post: body
        });
    });
})

// Remove tag from post by id
router.put('/removeTag/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var tagToDelete = body.tagName;
    var tagObj = {
        "tagName": tagToDelete
    };
    PostModel.findOneAndUpdate({
        _id: queryID
    }, {
        $pull: {
            tags: tagObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            post: body
        });
    });
})

// Get all posts by tag name
router.get('/AllPostsByTag/:tagName', function (req, res) {
    console.log("All post by tag name");
    var queryTagName = req.params.tagName;
    PostModel.find({ "tags.name": queryTagName}).then(function(tags) {
        console.log(tags);
        return res.status(200).json(tags);
    })
})

module.exports = router;