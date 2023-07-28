// import { Specification } from "../../entities/Specification";
// import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";
// import { inject, injectable } from "tsyringe";
// import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
// import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

// interface IRequest{
//     name: string;
//     description: string;
// } 


// @injectable()
// class ListSpecificationUseCase {

//     constructor(
//         @inject(SpecificationsRepository)
//         private specificationRepository: ISpecificationsRepository){}

//     async execute(): Promise<Specification[]>  {

//         const specifiations = await this.specificationRepository.list();

//         return specifiations

//     }
// }


// export {ListSpecificationUseCase}