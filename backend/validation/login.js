const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};
// Convert empty fields to an empty string so we can use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
// Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
        errors.msg = "Email Field Required"
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
        errors.msg = "Email Field Invalid"
    }
// Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
        if(errors.msg === undefined) {
            errors.msg = "Password Field Required"
        }
        else{
            errors.msg = errors.msg + "\nPassword Field Required"
        }
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};