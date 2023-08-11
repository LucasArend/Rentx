import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)

    })

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            "name": "aaaaa12aaaa",
            "description": "aaa12aaa",
            "daily_rate": 123,
            "license_plate":"aaa123aaa",
            "fine_amount":100,
            "brand": "aaaaaaa1",
            "category_id":"9bed4ad5-f226-478a-a558-4fc2934e9689"
        })


       const cars = await listAvailableCarsUseCase.execute({});
       
        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "aaaaa12aaaa",
            "description": "aaa12aaa",
            "daily_rate": 123,
            "license_plate":"aaa123aaa",
            "fine_amount":100,
            "brand": "aaaaaaa1",
            "category_id":"9bed4ad5-f226-478a-a558-4fc2934e9689"
        })


       const cars = await listAvailableCarsUseCase.execute({
            name:"aaaaa12aaaa"}
       );

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "aaaaa12aaaa",
            "description": "aaa12aaa",
            "daily_rate": 123,
            "license_plate":"aaa123aaa",
            "fine_amount":100,
            "brand": "aaaaaaa1",
            "category_id":"9bed4ad5-f226-478a-a558-4fc2934e9689"
        })


       const cars = await listAvailableCarsUseCase.execute({
            brand:"aaaaaaa1"}
       );

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "aaaaa12aaaa",
            "description": "aaa12aaa",
            "daily_rate": 123,
            "license_plate":"aaa123aaa",
            "fine_amount":100,
            "brand": "aaaaaaa1",
            "category_id":"9bed4ad5-f226-478a-a558-4fc2934e9689"
        })


       const cars = await listAvailableCarsUseCase.execute({
            category_id:"9bed4ad5-f226-478a-a558-4fc2934e9689"}
       );

        expect(cars).toEqual([car])
    })


})