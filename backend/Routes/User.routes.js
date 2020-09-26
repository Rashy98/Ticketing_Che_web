const bodyParser = require('body-parser');

const express = require('express');
const router = require('express').Router();
let User = require('../Models/User.Model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const qr = require('qrcode');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/',router);

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
    console.log(req.body);


    const url = req.body.url;
    let qrcode="";

    // qr.toDataURL(url,async (err, src)=>{
    //     await qrcode = src;
    //     console.log(src)
    // })
    qrcode = await qr.toDataURL(url)
    console.log(qrcode)


    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);


// Check validation
    if (!isValid) {
        return res.status(400).json(errors);

    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                nic: req.body.nic,
                contactNumber: req.body.contactNumber,
                history: req.body.history,
                Credits: req.body.Credits,
                TravelAccount: req.body.TravelAccount,
                generatedQR: qrcode,

            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });

    // user.save()
    //     .then(() => res.json({qr:qrcode}))
    //     .catch(err => res.status(400).json('Error: ' + err));
});
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
// Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
// Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
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
