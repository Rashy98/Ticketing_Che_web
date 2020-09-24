const bodyParser = require('body-parser');

const express = require('express');
const router = require('express').Router();
let User = require('../Models/User.Model');


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/',router);

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log(req.body);

    const user = new User({
        Name:req.body.Name,
        email:req.body.email,
        password:req.body.password,
        Nic:req.body.Nic,
        contactNo:req.body.contactNo,
        generatedQR:req.body.generatedQR,
        history:req.body.history,
        Credits:req.body.Credits,
        TravelAccount:req.body.TravelAccount
    })

    user.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(building => {
            building.building = req.body.building;
            building.save()
                .then(() => res.json('Building updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/pushHistory').post(function (req,res){
    User.findOneAndUpdate(
        { _id: req.body._id },
        {
            $push: {
                history: req.body.history
            },
        }
    )
        .then(doc => {
            res.send('history added');
        })
        .catch(err => {
            console.error(err);
        });
});

router.route('/updateCredit/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.Credits = req.body.Credits;
            user.save()
                .then(() => res.json('Credits updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
