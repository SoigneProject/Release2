/*
* Parent Route: /retailers
*/
const express = require('express');
const router = express.Router();
const RetailerModel = require('../models/retailerModel');

// Get all retailers
router.get('/', function (req, res) {
    RetailerModel.find((err, item) => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            itemObj: item
        });
    });
})

// Create a retailer
router.post('/', function (req, res) {
    let retailer = new RetailerModel();
    const {
        name,
        url
    } = req.body;

    if(!name || !url)
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
    });

    retailer.name = name;
    retailer.url = url;

    retailer.save((err) => {
        if (err) return res.json({
            created: false,
            error: err
        });
        return res.json({
            created: true
        });
    });
})

// Get all retailers with name
router.get('/name/:name', function (req, res) {
    var queryName = req.params.name;
    RetailerModel.findOne({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Delete a retailer by name
router.delete('/name/:name', function (req, res) {
    var queryName = req.params.name;
    RetailerModel.findOneAndDelete({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

module.exports = router;