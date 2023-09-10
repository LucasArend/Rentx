import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid"
import { IUsersRepository } from "../../repositories/IUsresRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokenRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import {resolve} from "path";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private etherealMailProvider: IMailProvider
    ){}

    async execute(email:string): Promise<void>{
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(
            __dirname,
            "..",
            "..",
            "views",
            "emails",
            "forgotPassword.hbs")

        if(!user){
            throw new AppError("User does not exists")
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addDays(3)

        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date: expires_date
        });

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.etherealMailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        )
    }
}

export {SendForgotPasswordMailUseCase}