'use strict';
var moment = require("moment");
const fs = require('fs');
const path = require('path');

class Services {

    success({ statusCode, token = undefined, data = [], totalCounts = null }) {
        return {
            status: 'success',
            statusCode,
            token,
            data,
            totalCounts
        };
    }

    fail({ message = "Something went wrong", statusCode = 500 }) {
        const error = new Error(message);
        error.statusCode = statusCode;
        return error;
    }

    getDateTime(dateTime) {
        return moment(dateTime).format("YYYY-MM-DD HH:mm:ss");
    }

    getNextDayDateTime(dateTime) {
        return moment(dateTime).add(1,'days').format("YYYY-MM-DD HH:mm:ss");
    }

    getDateOnly(dateTime) {
        return moment(dateTime).format("YYYY-MM-DD");
    }

    getNextDayDateOnly(dateTime) {
        return moment(dateTime).add(1,'days').format("YYYY-MM-DD");
    }

    clearImage(filePath) {
        filePath = path.join(__dirname, "../", filePath);
        fs.unlink(filePath, err => {
            console.log(err);
        });
    }

    paginate(page, limit) {
        const pagination = {};
        if (limit)
            pagination.limit = parseInt(limit);
        pagination.offset = parseInt(page) ? (parseInt(page) - 1) * (limit ? parseInt(limit) : 0) : 0;
        return pagination;
    }

}

module.exports = Services