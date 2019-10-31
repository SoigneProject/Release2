/*
 * Parent Route: /tags
 */
const express = require('express');
const router = express.Router();
const TagModel = require('../models/tagModel');

// Get all tags
router.get('/', function (req, res) {
    TagModel.find((err, tag) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            tagObj: tag
        });
    });
})

// Get a tag by name
router.get('/name/:name', function (req, res) {
    var queryName = req.params.name;
    TagModel.findOne({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Create a tag
router.post('/create', function (req, res) {
    let tag = new TagModel();
    const {
        name
    } = req.body;

    if (!name) {
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
        });
    }
    //name = name.trim();
    TagModel.countDocuments({
        name: name
    }, function (err, count) {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        } else if (count > 0) {
            return res.send({
                success: false,
                message: 'Error: Tag Name Already Exists, Please select from created tags.'
            });
        }
        tag.name = name;
        tag.save((err, tag) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success: true,
                name: tag,
                message: 'Tag Created'
            });
        });
    });
})

module.exports = router;