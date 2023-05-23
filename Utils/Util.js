const { validationResult, body, query, param, check } = require("express-validator");
const fs = require('fs')
const { otpAuth } = require('../Config');
const Api = require('./Api');

exports.bodyNotEmpty = key => {
    return body(key).notEmpty().withMessage(`${key} field is empty`);
};

exports.queryNotEmpty = key => {
    return query(key).notEmpty().withMessage(`${key} field is empty`);
};

exports.paramNotEmpty = key => {
    return param(key).notEmpty().withMessage(`${key} field is empty`);
};
exports.ValidateDateFormat = key =>{
    return check(key).matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/).withMessage(`${key} format should be (YYYY-MM-DD)`)
}
exports.ValidateStatus = key =>{
    return check(key).trim().matches(/^[A-Z]+$/).withMessage(`${key} Should be in caps`)
}
exports.ValidateName = key =>{
    return check(key).matches(/^([a-zA-Z]+\s)*[a-zA-Z]+$/).withMessage(`${key} can contain only Uppercase, lowercase and single space`)
}
exports.clearImage= (path)=>{
    fs.unlink(path, (err) => {
        if (err) {
            Logger.error(err)
        }})
}
exports.checkInputError = (req, images = []) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (images.length > 0) {
            images.forEach(image => {
                this.clearImage(image.path);
            });
        }
        const error = new Error("Validation failed, entered data is incorrect");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
};

exports.catchError = function (err, next) {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
}
