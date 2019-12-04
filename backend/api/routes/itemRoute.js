/*
* Parent Route: /items
*/
const express = require('express');
const router = express.Router();
const ItemModel = require('../models/itemModel');

// Get all items
router.get('/', function (req, res) {
    ItemModel.find((err, item) => {
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

// Get item with id
router.get('/id/:id', function (req, res) {
    var queryID = req.params.id;
    ItemModel.findById({
        _id:  queryID
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Get item with name
router.get('/name/:name', function (req, res) {
    var queryName = req.params.name;
    ItemModel.find({
        name: queryName
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Get all items with retailer
router.get('/retailerID/:retailerID', function (req, res) {
    var retailerQuery = req.params.retailerID;
    ItemModel.find({
        retailerID: retailerQuery
    }, function (err, obj) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

// Create item
router.post('/', function (req, res) {
    let item = new ItemModel();
    const {
        name,
        url,
        clothingCategory,
        retailerID,
        price
    } = req.body;

    if(!name || !url || !clothingCategory || !retailerID || !price)
        return res.json({
            created: false,
            error: 'INVALID INPUTS'
    });

    item.name = name;
    item.url = url;
    item.clothingCategory = clothingCategory;
    item.retailerID = retailerID;
    item.price = price;
    
    item.save((err) => {
        if (err) return res.json({
            created: false,
            error: err
        });
        return res.json({
            created: true
        });
    });
})

// Update item with id
router.put('/id/:id', function (req, res) {
    var queryID = req.params.id;
    var body = req.body;
    ItemModel.findOneAndUpdate({
        _id: queryID
    }, body, function (err) {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({
            success: true,
            item: body
        });
    });
})

// Delete item with id
router.delete('/id/:id', function (req, res) {
    var queryID = req.params.id;

    ItemModel.findOneAndDelete({
        _id: queryID
    }, function (err, obj){
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.send(obj);
    });
})

module.exports = router;