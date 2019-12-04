/*
 * Parent Route: /users
 */
const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');
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

// Get all users
router.get('/', function (req, res) {
    UserModel.find((err, user) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            userObj: user
        });
    });
})

// Create a user
router.post('/signup', function (req, res) {
    let user = new UserModel();
    const {
        username,
        firstName,
        lastName,
        password
    } = req.body;

    let {
        emailAddress
    } = req.body;

    // Start
    if (!username || !firstName || !lastName || !emailAddress || !password) {
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });
    }

    UserModel.countDocuments({
        username: username
    }, function (err, count) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (count > 0) {
            return res.send({
                success: false,
                message: 'Error: Account already exists with that username.'
            });
        }

        emailAddress = emailAddress.toLowerCase();
        emailAddress = emailAddress.trim();
        // Steps:
        // 1. Verify email doesn't exist
        // 2. Save
        UserModel.countDocuments({
            emailAddress: emailAddress
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if (previousUsers > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists with that email.'
                });
            }
            // Save the new user
            user.emailAddress = emailAddress;
            user.password = user.generateHash(password);
            user.username = username;
            user.firstName = firstName;
            user.lastName = lastName;
            user.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    username: user,
                    message: 'Signed up'
                });
            });
        });
    });
})

// Create a JWT token when signing in and saves it in a cookie
router.post('/signin', passport.authenticate('local', {
    session: false
}), function (req, res) {
    const body = {
        username: req.user.username
    }
    req.login(body, {session: false}, (error) => {
        if (error) res.status(400).send({ error });
        jwt.sign(JSON.stringify(body), 'stronksecret', (err, token) => {
            if (err) return res.json(err);
            // Set cookie header
            res.cookie('jwt', token, {
                httpOnly: true,
                sameSite: true
            });
            return res.send({
                username: req.user.username,
                success: true
            });
        });
    })
    
})

// Log out by deleting cookie
router.get('/logout', function (req, res) {
    res.cookie('jwt', '', {expires: new Date(0)});
    return res.send({
        loggedOut: true
    });
})

// Get a user
router.get('/:username', function (req, res) {
    var queryUsername = req.params.username;
    UserModel.findOne({
        username: queryUsername
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Get a blank user (used for failure redirect)
router.get('/guest', function (req, res) {
    return res.json({
        username: ''
    });
})

//Leo update photo version:
// Update a user's photo
// Upload photo, then upload to cloud (similar to post way of uploading photo)
//Retrieve current user and set body to that.
//return that object
router.put('/photo/:username', function (req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        // console.log(req);
        var queryUsername = req.params.username;
        UserModel.findOne({
            username: queryUsername
        }, function (err, obj) {
            var body = obj;
            cloudinary.uploader.upload(req.file.path, function (result) {
                body.profilePic = result.url;
                body.profilePic_id = result.public_id;
    
                UserModel.findOneAndUpdate({
                    username: queryUsername
                }, body, function (err) {
                    if (err) return res.json({
                        success: false,
                        error: err
                    });
                    // Remove temp file
                    fs.unlink(req.file.path, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    return res.json({
                        success: true,
                        user: body
                    });
                });
            });
        });
    });
})


// Update a user
// Original put method.
router.put('/info/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, body, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

// Delete a user
router.delete('/:username', function (req, res) {
    var queryUsername = req.params.username;
    UserModel.findOneAndDelete({
        username: queryUsername
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Add a follower
router.put('/follower/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var follower = body.user;
    var followerObj = {
        "username": follower
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $push: {
            followers: followerObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

// Follow a user
router.put('/following/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var userToFollow = body.user;
    var userToFollowObj = {
        "username": userToFollow
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $push: {
            following: userToFollowObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

// Remove a follower
router.put('/removeFollow/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var follower = body.user;
    var followerObj = {
        "username": follower
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            followers: followerObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

// Unfollow a user
router.put('/unfollow/:username', function (req, res) {
    var queryUsername = req.params.username;
    var body = req.body;
    var userToFollow = body.user;
    var userToFollowObj = {
        "username": userToFollow
    };
    UserModel.findOneAndUpdate({
        username: queryUsername
    }, {
        $pull: {
            following: userToFollowObj
        }
    }, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            user: body
        });
    });
})

module.exports = router;