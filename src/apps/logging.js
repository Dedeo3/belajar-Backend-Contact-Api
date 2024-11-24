import winston from "winston";

export const logging = winston.createLogger({
    level:"info",
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({})
    ]
})