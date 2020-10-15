const bodyParser = require('body-parser');

const express = require('express');
const router = require('express').Router();
let BusStands = require('../Models/BusStands.Model');
let User = require('../Models/User.Model');
let Inspections = require('../Models/Inspection.Model');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * will return details to generate user reports
 */
router.route("/getUsers").get(async (req, res) => {

    //declaration of variables
    let arr_startStations = [];
    let arr_endStations = [];
    let arr_journeys = []

    //get user details
    let users = await User.find();

    //process each user journeys
    for (let user of users){
        let arr_journeyHistory = user.history;

        if (arr_journeyHistory.length > 0){
            for (let journey of arr_journeyHistory){

                if (journey === null){
                    continue;
                }

                let isStartStationFound = arr_startStations.filter(obj => obj.station === journey.Start);
                let isEndStationFound = arr_endStations.filter(obj => obj.station === journey.End);
                let isJourneyFound = arr_journeys.filter(obj => (obj.from === journey.Start) && (obj.to === journey.End));

                //add all distinct start stations
                if (isStartStationFound.length === 0){
                    arr_startStations.push({station : journey.Start, count : 1})
                } else {
                    let index = arr_startStations.findIndex(obj => obj.station === journey.Start);
                    let tempStartStation = arr_startStations.splice(index, 1);
                    tempStartStation[0].count = tempStartStation[0].count + 1;
                    arr_startStations.push(tempStartStation[0]);
                }

                //add all distinct end stations
                if (isEndStationFound.length === 0){
                    arr_endStations.push({station : journey.End, count : 1})
                } else {
                    let index = arr_endStations.findIndex(obj => obj.station === journey.End);
                    let tempEndStation = arr_endStations.splice(index, 1);
                    tempEndStation[0].count = tempEndStation[0].count + 1;
                    arr_endStations.push(tempEndStation[0]);
                }

                //add all distinct user journeys
                if (isJourneyFound.length === 0){
                    arr_journeys.push({from : journey.Start, to : journey.End, count : 1})
                } else {
                    let index = arr_journeys.findIndex(obj => (obj.from === journey.Start) && (obj.to === journey.End));
                    let tempJourney = arr_journeys.splice(index, 1);
                    tempJourney[0].count = tempJourney[0].count + 1;
                    arr_journeys.push(tempJourney[0]);
                }
            }
        }
    }

    if (users){
        return res.status(200).json({success : true, startStations : arr_startStations, endStations : arr_endStations, journeys : arr_journeys})
    } else {
        return res.status(400).json({success : false, users : "Failed to load"})
    }
});

/**
 * will returns details to generate inspections report
 */
router.route('/getInspections').get(async (req, res) => {

    let result = await Inspections.find();

    if (result) {
        return res.status(200).json({success : true, result : result});
    } else {
        return res.status(400).json({success : false, error : "Server Error"});
    }
});

/**
 * will return details to generate fare reports
 */
router.route('/getBusStand').get(async (req, res) => {

    let result = await BusStands.find();

    if (result) {
        return res.status(200).json({success : true, result : result});
    } else {
        return res.status(400).json({success : false, error : "Server Error"});
    }
})

module.exports = router;