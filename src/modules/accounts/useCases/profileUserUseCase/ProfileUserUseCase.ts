import { IUsersRepository } from "@modules/accounts/repositories/IUsresRepository";
import { inject, injectable } from "tsyringe";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserReponseDTO } from "@modules/accounts/dtos/IUserReponseDTO";
import { UserMap } from "@modules/accounts/mapper/UserMap";

@injectable()
class ProfileUserUseCase{
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(id: string): Promise<IUserReponseDTO>{
        const user = await this.usersRepository.findById(id)
        return UserMap.toDTO(user)
    }
}

export {ProfileUserUseCase}