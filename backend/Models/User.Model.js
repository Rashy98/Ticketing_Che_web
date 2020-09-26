
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema =  new schema(
    {
        name:{
            type:String,
            required: true
        },
        email:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        nic:{
          type:String,
            required: true
        },
        contactNumber:{
            type:Number,
            required: true
        },
        generatedQR:{
            type:String
        },
        history:{
            type:Array
        },
        Credits:{
            type:Number,
            default:100
        },
        TravelAccount:{
            type: String
        }
    });

const User= mongoose.model('User',UserSchema);

module.exports = User;
