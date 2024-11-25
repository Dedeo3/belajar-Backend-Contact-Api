import {ResponseEror} from "../error/response-eror.js";

const errorMiddleware = async (err, req, res, next) => {
    if (!err){
        next()
        return
    }

    if (err instanceof ResponseEror) {
        res.status(err.status).json({
            error: err.message}).end();
    }
    else {
        res.status(500).json({
            error: err.message
        }).end()
    }
}

export {errorMiddleware}