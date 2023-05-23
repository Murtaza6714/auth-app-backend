const axios = require('axios');
const { serverAuth } = require('../Config')

module.exports = class Apis {

    static async post(url, data, isInternal = true) {
        try {
            const payload = {
                url,
                data,
                method : 'post',
                headers: {
                    'content-type': 'application/json'
                }
            };
            if (isInternal) {
                payload.headers.accessKey = serverAuth.secret
            }
            let result = await axios(payload);
            return result.data;
        } catch (error) {
            const errorRes = new Error(error.response.data.message);
            errorRes.statusCode = error.response.data.statusCode;
            errorRes.data = error.response.data.error;
            throw errorRes;
        }
    }

    static async get(url, params = '', isInternal = true) {
        try {
            const qs      = params;
            const payload = {
                params : qs,
                method : 'get',
                headers: {
                    'content-type': 'application/json'
                },
            };
            if (isInternal) {
                payload.headers.accessKey = serverAuth.secret
            }
            let result = await axios.get(url, payload);
            return result.data;
        } catch (error) {
            const errorRes = new Error(error.response.data.message);
            errorRes.statusCode = error.response.data.statusCode;
            errorRes.data = error.response.data.error;
            throw errorRes;
        }
    }
};