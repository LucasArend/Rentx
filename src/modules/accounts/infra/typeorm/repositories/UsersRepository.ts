import { Repository, getRepository } from "typeorm";
import { ICreateUsreDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsresRepository";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;

    constructor(){
        this.repository =  getRepository(User);
    }
    
    async create({name, email, driver_license, password, avatar, id}: ICreateUsreDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id,
        });
        
        await this.repository.save(user);
        
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email});

        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);

        return user
    }
    
}

export {UsersRepository}