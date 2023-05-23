const path = require('path');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, splat } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} :  [${level}] : ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        splat(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: path.join(__dirname, '../Assets/logs/error.log'), level: 'error', maxsize: '20m', maxFiles: '2d' }),
        new transports.File({ filename: path.join(__dirname, '../Assets/logs/info.log'), level: 'info', maxsize: '20m', maxFiles: '2d' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            timestamp(),
            splat(),
            myFormat
        )
    }));
}

module.exports = logger;