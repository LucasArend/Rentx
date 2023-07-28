import { IUsersRepository } from "@modules/accounts/repositories/IUsresRepository"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { ICategoryRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository"
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository"
import {container} from "tsyringe"




container.registerSingleton<ICategoryRepository>(
    "CategoriesRepository",    
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",    
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)