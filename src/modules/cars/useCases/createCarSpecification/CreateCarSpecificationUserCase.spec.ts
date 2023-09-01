import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationUserCase"
import { AppError } from "@shared/errors/AppError"
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory"


let createCarSpecificationUseCase: CreateCarSpecificationsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create car specification", () => {

    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationsUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory)
    })

    it("should not be able to add a new specification to a non-existent car", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"]

        await expect(createCarSpecificationUseCase.execute({
                car_id, specifications_id
            })
        ).rejects.toEqual(new AppError("Car does not exists!"))
    })
    it("should be able to add a new specification to the car", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "aaaaa12aaaa",
            "description": "aaa12aaa",
            "daily_rate": 123,
            "license_plate":"aaa123aaa",
            "fine_amount":100,
            "brand": "aaaaaaa1",
            "category_id":"9bed4ad5-f226-478a-a558-4fc2934e9689"
        })

        const specification = await specificationsRepositoryInMemory.create({
            name: "test",
            description: "test"
        })

        const specifications_id = [specification.id]

       const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id
        });

        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1);

    });
    
})