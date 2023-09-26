import dayjs from "dayjs"
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory"
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { AppError } from "@shared/errors/AppError"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayjsDateProvider/DayjsDateProvider"
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayjsDateProvider: DayJsDateProvider
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create rebtak", () => {

    const dayAdd24Hours = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayJsDateProvider()
        carsRepositoryInMemory = new CarsRepositoryInMemory
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
             dayjsDateProvider,
             carsRepositoryInMemory
        );
    })

    it("should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name:"Test",
            description:"Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand"
        })


       const rental = await createRentalUseCase.execute({
            user_id:"12345",
            car_id: car.id,
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    })

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24Hours,
            user_id: "123"         
        })

        await expect(createRentalUseCase.execute({
                user_id:"12345",
                car_id:"test",
                expected_return_date: dayAdd24Hours,
            })

        ).rejects.toEqual(new AppError("Car is unavailable"))

    })

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "123123123",
            expected_return_date: dayAdd24Hours,
            user_id: "123"         
        })

        await expect(createRentalUseCase.execute({
                user_id:"123",
                car_id:"12121212",
                expected_return_date: dayAdd24Hours,
            })

        ).rejects.toEqual(new AppError("There's a rental in progress for user!"))

    })

    it("should not be able to create a new rental with invalid return time", async () => {
       await expect(createRentalUseCase.execute({
                user_id:"123",
                car_id:"12121212",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid return time!"))
    })
})