/*
 * Parent Route: /posts
 */
const express = require("express");
const router = express.Router();
const PostModel = require("../models/postModel");
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
}).single('file');
const fs = require('fs');
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "soigne-pix",
    api_key: "472288961331361",
    api_secret: "VylP7m3EhxWbbzWEE8NBAcbcxKs"
});

// Get all posts
router.get("/", function (req, res) {
    PostModel.find((err, post) => {
        if (err)
            return res.json({
                success: false,
                error: err
            });
        return res.json({
            success: true,
            postObj: post
        });
    });
});

//get all posts by username
router.get("/username/:username", function (req, res) {
    var queryUsername = req.params.username;
    PostModel.find({
            username: queryUsername
        },
        function (err, obj) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.send(obj);
        }
    );
});

// Get post with id
router.get("/id/:id", function (req, res) {
    // Get a user
    var queryID = req.params.id;
    PostModel.findById({
            _id: queryID
        },
        function (err, obj) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.send(obj);
        }
    );
});

// Get all posts with name
router.get("/title/:title", function (req, res) {
    var queryTitle = req.params.title;
    PostModel.find({
            title: queryTitle
        },
        function (err, obj) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.send(obj);
        }
    );
});

// Create a post
router.post("/", function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        const {
            title,
            description,
            username,
        } = req.body;
        cloudinary.uploader.upload(req.file.path, function (result) {
            let post = new PostModel();
            if (!title || !description || !username) {
                return res.json({
                    created: false,
                    error: "INVALID INPUTS"
                });
            }
            var ourDate = new Date();
            ourDate.setHours(ourDate.getHours() + 7);
            post.dateTime = ourDate;
            post.title = title;
            post.description = description;
            post.username = username;
            post.photo = result.url;
            post.photo_id = result.public_id;
            post.save(err => {
                if (err) {
                    return res.json({
                        created: false,
                        error: err
                    });
                }
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                return res.json({
                    title: title,
                    dateTime: ourDate,
                    description: description,
                    username: username,
                    photo: result.url,
                    photo_id: result.public_id,
                    created: true
                });
            });
        });
    });
});

// Update a post
router.put("/id/:id", function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    PostModel.findOneAndUpdate({
            _id: queryID
        },
        body,
        function (err) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.json({
                success: true,
                post: body
            });
        }
    );
});

// Delete a post
router.delete("/id/:id", function (req, res) {
    var queryID = req.params.id;
    PostModel.findOneAndDelete({
            _id: queryID
        },
        function (err, obj) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.send(obj);
        }
    );
});

// Add a tag to post by id
router.put("/addTag/:id", function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var tagToAdd = body.tagName;
    var tagObj = {
        tagName: tagToAdd
    };
    PostModel.findOneAndUpdate({
            _id: queryID
        }, {
            $push: {
                tags: tagObj
            }
        },
        function (err) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.json({
                success: true,
                post: body
            });
        }
    );
});

// Remove tag from post by id
router.put("/removeTag/:id", function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var tagToDelete = body.tagName;
    var tagObj = {
        tagName: tagToDelete
    };
    PostModel.findOneAndUpdate({
            _id: queryID
        }, {
            $pull: {
                tags: tagObj
            }
        },
        function (err) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.json({
                success: true,
                post: body
            });
        }
    );
});

// Add a Item to post by id
router.put("/addItem/:id", function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var itemToAdd = body.itemName;
    var itemID = body.itemID;
    var itemObj = {
        _id: itemID,
        itemName: itemToAdd
    };
    PostModel.findOneAndUpdate({
            _id: queryID
        }, {
            $push: {
                items: itemObj
            }
        },
        function (err) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.json({
                success: true,
                post: body
            });
        }
    );
});

// Remove Item from post by id
router.put("/removeItem/:id", function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    var itemToDelete = body.itemName;
    var itemObj = {
        itemName: itemToDelete
    };
    PostModel.findOneAndUpdate({
            _id: queryID
        }, {
            $pull: {
                items: itemObj
            }
        },
        function (err) {
            if (err)
                return res.json({
                    success: false,
                    error: err
                });
            return res.json({
                success: true,
                post: body
            });
        }
    );
});

//this will get all the posts with a specific tag
router.get('/AllPostsByTag/:tagName', function (req, res) {
    var queryTagName = req.params.tagName;
    PostModel.find({
            'tags': {
                $elemMatch: {
                    'tagName': queryTagName
                }
            }
        },
        function (err, obj) {
            if (err) return res.json({
                success: false,
                error: err
            });
            return res.send(obj);
        });
})

//this will get all of the posts that have a specific item in them
router.get('/AllPostsByItem/:itemName', function (req, res) {
    var queryItemName = req.params.itemName;
    PostModel.find({
            'items': {
                $elemMatch: {
                    'itemName': queryItemName
                }
            }
        },
        function (err, obj) {
            if (err) return res.json({
                success: false,
                error: err
            });
            return res.send(obj);
        });
})

module.exports = router;