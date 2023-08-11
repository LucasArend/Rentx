import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    findByName(name: string): Promise<Specification>;
    create({name,description}: ICreateSpecificationDTO): Promise<Specification>;
    findByIds(ids: string[]):Promise<Specification[]>;
}

export {ISpecificationsRepository, ICreateSpecificationDTO}