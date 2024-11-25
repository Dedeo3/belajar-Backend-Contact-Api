import {validation} from "../validation/validation.js";
import  {registerUserValidation,loginUserValidation} from "../validation/user_validation.js";
import {prismaClient} from "../apps/databases.js";
import {ResponseEror} from "../error/response-eror.js";
import bcrypt from 'bcrypt'
import {v4 as uuid} from "uuid";

const register = async (request) => {
    const user = validation(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username,
        }
    })

    if (countUser === 1) {
        throw new ResponseEror(400, "User already exists");
    }

    user.password = await bcrypt.hash(user.password, 10);

    const result = prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true,
        }
    })
    return result
}

const login = async (request) => {
    // Validasi request berdasarkan skema loginUserValidation
    const loginReq = validation(loginUserValidation, request);

    // Ambil data user dari database berdasarkan username
    const userDb = await prismaClient.user.findUnique({
        where: {
            username: loginReq.username
        },
        select: {
            username: true,
            password: true,
        }
    });

    // Jika user tidak ditemukan, lemparkan error
    if (!userDb) {
        throw new ResponseError(401, "User or password wrong");
    }

    // Bandingkan password yang dimasukkan dengan yang ada di database
    const isPasswordValid = await bcrypt.compare(loginReq.password, userDb.password);

    // Jika password tidak valid, lemparkan error
    if (!isPasswordValid) {
        throw new ResponseError(401, "User or password wrong");
    }

    const token= uuid().toString()

    return prismaClient.user.update({
        data:{
            token:token
        },
        where: {
            username: userDb.username
        },
        select:{
            token:true
        }
    })
};


export default {
    register,
    login
}
