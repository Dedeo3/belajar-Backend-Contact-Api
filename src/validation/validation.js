import {ResponseEror} from "../error/response-eror.js";

const  validation = (schema, request)=>{
    const result = schema.validate(request);

    if (result.errors){
        throw new ResponseEror(400, result.errors.message);
    }else {
        return result.value
    }
}

export {validation}