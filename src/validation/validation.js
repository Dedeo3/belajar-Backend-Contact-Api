const  validation = (schema, request)=>{
    const result = schema.validate(request);

    if (result.errors){
        throw result.errors;
    }else {
        return result.value
    }
}

export {validation}