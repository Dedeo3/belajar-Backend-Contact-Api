import {validation} from "../validation/validation.js";
import registerUserValidation from "../validation/user_validation.js";
import {prismaClient} from "../apps/databases.js";
import {ResponseEror} from "../error/response-eror.js";
import bcrypt from 'bcrypt'

const register = async (request)=>{
   const user = validation(registerUserValidation, request);

   const countUser= await prismaClient.user.count({
       where: {
           username: user.username,
       }
   })

    if(countUser===1){
        throw new ResponseEror(400,"User already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = prismaClient.user.create({
        data:user,
        select:{
            username: true,
            name: true,
        }
    })
    return result
}

export default {
    register,
}
