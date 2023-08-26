const winston = require("winston");


const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "app.log",
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            filename: "error.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        new winston.transports.File({
            filename: "warn.log",
            level: "warn",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        })
    ]
});


module.exports ={
    logger
}