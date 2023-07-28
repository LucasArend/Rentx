import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsresRepository";
import { ICreateUsreDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { hash } from "bcryptjs"
import { AppError } from "@shared/errors/AppError";



@injectable()
class CreateUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository:IUsersRepository
    ){};

    async execute({name, email, password, driver_license}: ICreateUsreDTO): Promise<void>{

        const userAlredyExists = await this.usersRepository.findByEmail(email);

        if(userAlredyExists){
            throw new AppError("User alredy exists")
        }

        const passwordHash = await hash(password, 8)

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });
    }
}

    export { CreateUserUseCase}