/*
 * Parent Route: /users
 */
const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

// router.get('/logout', function (req, res) {
//     // Get the token
//     const token = req.query.token;
//     // ?token=test
//     // Verify the token is one of a kind and it's not deleted.
//     UserSessionModel.findOneAndUpdate({
//         _id: token,
//         isDeleted: false
//     }, {
//         $set: {
//             isDeleted: true
//         }
//     }, null, (err, sessions) => {
//         if (err) {
//             console.log(err);
//             return res.send({
//                 success: false,
//                 message: 'Error: Server error'
//             });
//         }
//         return res.send({
//             success: true,
//             message: 'Logged out'
//         });
//     });
// })

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

// Update a user
router.get('/:username', function (req, res) {
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
router.get('/:username', function (req, res) {
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