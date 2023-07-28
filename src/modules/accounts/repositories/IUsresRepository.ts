import { ICreateUsreDTO } from "../dtos/ICreateUserDTO"
import { User } from "../infra/typeorm/entities/User"

interface IUsersRepository{
    create(data: ICreateUsreDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export {IUsersRepository}