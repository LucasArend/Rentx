import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsresRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

interface IRequest{
    token: string,
    password: string
}
@injectable()
class ResetPasswordUserUseCase{

    constructor(
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dateProvider:IDateProvider,
        @inject("UsersRepository")
        private usersRpository: IUsersRepository
    ){}

    async execute({token, password}:IRequest): Promise<void>{
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);

        if(!userToken){
            throw new AppError("Token invalid!")
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError("Token expired!")
        }

        const user = await this.usersRpository.findById(userToken.user_id);

        user.password = await hash(password, 8)

        await this.usersRpository.create(user);

        await this.usersTokenRepository.deleteById(userToken.id)
    };

}

export {ResetPasswordUserUseCase}