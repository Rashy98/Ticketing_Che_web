const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../Models/User.Model')



// exports.userSignIn = (req,res, next) =>{
//     User.find({email:re.body.email});
//     .exec()
//     .then(user =>{
//         if(user.length <1) {
//          return res.status(404).json({
//              message:"Auth failed"
//          });
//     }
//     bcrypt.compare(req.body.password,user[0].password, (err, result) =>{
//          if(err){
//               return res.status(404).json({
//                     message:"Auth Failed"
//               });
//           }
//          if (result){
//               const token
//           }
//
//         )
//     });
// }
