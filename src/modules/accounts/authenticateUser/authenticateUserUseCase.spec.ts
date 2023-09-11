import { AppError } from "@shared/errors/AppError"
import { ICreateUsreDTO } from "../dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./authenticateUserUseCase"
import { UsersTokensRepositoryInMemory } from "../repositories/in-memory/UsersTokenRepositoryInMemory"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayjsDateProvider.ts/DayjsDateProvider"

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory:UsersTokensRepositoryInMemory
let createUserUseCase:CreateUserUseCase
let dateProvider:DayJsDateProvider

describe("authenticate User", () => {
    beforeEach(() =>{
        dateProvider = new DayJsDateProvider()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        usersRepositoryInMemory = new UsersRepositoryInMemory(),
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory),
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider)

    })
    it("should be able to authenticate an user", async() => {
        const user: ICreateUsreDTO ={
            driver_license: "00123",
            email: "user@test.com",
            password: "1234",
            name:"testUser"
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () =>{
        await expect(authenticateUserUseCase.execute({
                email: "false@mail.conm",
                password: "1213"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"))
    })

    it("should not be able to authenticate with incorret password", async() => {
        const user: ICreateUsreDTO ={
            driver_license: "00123",
            email: "user@test.com",
            password: "1234",
            name:"testUser"
        };

        await createUserUseCase.execute(user);
        
       await expect(authenticateUserUseCase.execute({
                email: user.email,
                password: "user.password"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"));
    });
})