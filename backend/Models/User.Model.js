
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const UserSchema =  new schema(
    {
        Name:{
            type:String
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        Nic:{
          type:String
        },
        contactNo:{
            type:Number
        },
        generatedQR:{
            type:Buffer
        },
        history:{
            type:Array
        },
        Credits:{
            type:Number
        },
        TravelAccount:{
            type: String
        }
    });

const User= mongoose.model('User',UserSchema);

module.exports = User;
