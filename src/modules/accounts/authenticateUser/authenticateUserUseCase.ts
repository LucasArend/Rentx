import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsresRepository";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppError } from "@shared/errors/AppError";

interface IRequest{
    email: string;
    password: string
}

interface IRespose{
    user:{
        name: string
        email: string
    }
    token: string;
}

@injectable()
class AuthenticateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({email, password}: IRequest): Promise<IRespose>{

        const user = await this.usersRepository.findByEmail(email);

        if (!user){
            throw new AppError("email or password incorrect!")
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch){
            throw new AppError("Email or password incorrect!")
        }

        const token = sign({}, "2146f9af444d603e6588c02b760dbb17", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IRespose = {
            token,
            user:{
                name: user.name,
                email: user.email
            }

        }

        return tokenReturn

    }
}

export {AuthenticateUserUseCase}