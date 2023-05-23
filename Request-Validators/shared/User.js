const { Util } = require('../../Utils');
const { check, body, query } = require("express-validator");

exports.login = [
    Util.bodyNotEmpty("email").isEmail().withMessage("Please enter a valid email address."),
    Util.bodyNotEmpty("password")
];

exports.users = [
    query("type").optional({ checkFalsy: true }).trim().matches(/^[A-Z]+$/).withMessage(`Type Should be in caps`)
]

exports.user = [
    Util.bodyNotEmpty("name").isLength({ min: 3 }).optional({ checkFalsy: true }).withMessage("Please enter a proper name!!"),
    Util.bodyNotEmpty("email").isEmail().optional({ checkFalsy: true }).withMessage("Please enter a valid email address.").normalizeEmail().trim(),
    Util.bodyNotEmpty("password").isLength({ min: 7 }).isAlphanumeric().optional({ checkFalsy: true }).trim().withMessage('Password has to be valid!'),
    Util.bodyNotEmpty("contactNumber").trim().isNumeric().isMobilePhone().optional({ checkFalsy: true }).isLength({ min: 7 }).withMessage("Please enter a valid contact number!!"),
    // body("vanNumber").isNumeric().trim(),
];

exports.params = [
    Util.paramNotEmpty("id")
  ]