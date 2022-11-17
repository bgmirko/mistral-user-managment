import { plainToInstance } from "class-transformer";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import { Validator } from "class-validator";

export function validator<T>(type: any): RequestHandler{

    return (req: Request, res: Response, next: NextFunction) => {
        const params = req.method === "GET" ? req.params : req.body;
        let input = plainToInstance(type, params);
        let validator = new Validator();

        let errors = validator.validateSync(input);
        if( errors.length > 0){
            res.status(400).json({errors: errors}).end();
        } else {
            next();
        }
    }
}