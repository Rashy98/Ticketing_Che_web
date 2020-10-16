const bodyParser = require('body-parser');

const express = require('express');
const router = require('express').Router();
let Inspection = require('../Models/Inspection.Model');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.route('/addInspection').post((req, res) => {

    const inspection = new Inspection({
        inspectorId : req.body.inspectorId,
        inspectorName : req.body.inspectorName,
        vehicleId : req.body.vehicleId,
        start : req.body.start,
        end : req.body.end,
        validTicketCount : req.body.validTicketCount,
        invalidTicketCount : req.body.invalidTicketCount,
        totalPassengerCount : req.body.totalPassengerCount
    })

    inspection.save()
        .then(result => {
            return res.status(200).json({success : true, result : result});
        })
        .catch(err => {
            return res.status(400).json({success : false, error : err});
        })
});

module.exports = router;