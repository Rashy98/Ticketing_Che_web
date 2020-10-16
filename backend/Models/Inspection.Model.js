const mongoose = require('mongoose');
const schema = mongoose.Schema;

const InspectionSchema =  new schema({

    inspectorId : {
        type : String,
        required : true
    },
    inspectorName : {
        type : String,
        required : true
    },
    vehicleId : {
        type : String,
        required : true
    },
    start : {
        type : String,
        required : true
    },
    end : {
        type : String,
        required : true
    },
    validTicketCount : {
        type : Number,
        required : true
    },
    invalidTicketCount : {
        type : Number,
        required : true
    },
    totalPassengerCount : {
        type : Number,
        required : true
    },
});

const Inspection = mongoose.model('Inspections',InspectionSchema);

module.exports = Inspection;
