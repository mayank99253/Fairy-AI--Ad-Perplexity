import { validationResult } from "express-validator" 

export const validation = async(req, res ,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            success :false,
            error :error.array()
        })
    };

    next()
}