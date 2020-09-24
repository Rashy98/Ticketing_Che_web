const bodyParser = require('body-parser');

const express = require('express');
const router = require('express').Router();
let BusStands = require('../Models/BusStands.Model');


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/',router);

router.route('/').get((req, res) => {
    BusStands.find()
        .then(stands => res.json(stands))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log(req.body);

    const busStands = new BusStands({
            busStand:req.body.busStand,
            DistanceFromCol : req.body.DistanceFromCol
    })

    busStands.save()
        .then(() => res.json('Bus stand added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    busStands.findByIdAndDelete(req.params.id)
        .then(() => res.json('Building deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    busStands.findById(req.params.id)
        .then(building => {
            building.building = req.body.building;
            building.save()
                .then(() => res.json('Building updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
