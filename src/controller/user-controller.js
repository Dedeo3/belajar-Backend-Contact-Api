import user_service from "../service/user_service.js";
const register = async (req, res, next) => {
    try {
        const result = await user_service.register(req.body);
        res.status(200).json({
            data: result
        });
    }catch (error) {
        next(error);
    }
}

export default {
    register
}