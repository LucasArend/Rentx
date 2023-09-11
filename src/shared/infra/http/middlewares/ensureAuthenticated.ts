import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import {NextFunction, Request, Response} from "express"
import { verify } from "jsonwebtoken";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { auth } from "@config/auth";


//caso de problema na const {sub}, forçar utilizando interface
interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new AppError("Token missing!", 401)
    }


    const [, token] = authHeader.split(" ")

    try{
        const {sub: user_id} = verify(token, auth.secret_token) as IPayload; //as IPayload (caso precise da interface)

        request.user = {
            id: user_id
        }

        next();
    } catch{
        throw new AppError("invalid token!", 401);
    }
}