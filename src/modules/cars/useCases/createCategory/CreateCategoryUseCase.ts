import { AppError } from "@shared/errors/AppError";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";


interface IRequest{
    name: string;
    description: string;
} 

@injectable()
class CreateCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoryRepository
        ){}

    async execute({name,description}:IRequest): Promise<void> {

        const categoriesAlredyExists = await this.categoriesRepository.findByName(name);

        if (categoriesAlredyExists) {
            throw new AppError('Category alredy exist!')
        }

        this.categoriesRepository.create({ name, description });
    }
}


export {CreateCategoryUseCase}