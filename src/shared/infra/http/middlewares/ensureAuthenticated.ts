import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import {NextFunction, Request, Response} from "express"
import { verify } from "jsonwebtoken";


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
    const {sub: user_id} = verify(token, "2146f9af444d603e6588c02b760dbb17") as IPayload; //as IPayload (caso precise da interface)
  
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id)

    if(!user){
        throw new AppError("User does not exist!", 401)
    }

    request.user = {
        id: user_id
    }

    next();
    } catch{
        throw new AppError("invalid token!", 401);
    }
}