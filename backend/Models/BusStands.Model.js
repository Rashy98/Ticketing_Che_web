const mongoose = require('mongoose');

const schema = mongoose.Schema;

const BusStandSchema =  new schema(
    {
        busStand:{
            type:String
        },
        DistanceFromCol:{
            type:Number
        }
    });

const BusStand= mongoose.model('Stand',BusStandSchema);

module.exports = BusStand;
