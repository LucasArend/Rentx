import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory"
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/DayjsDateProvider.ts/DayjsDateProvider"
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() =>{
        usersRepositoryInMemory = new UsersRepositoryInMemory(),
        dateProvider = new DayJsDateProvider(),
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory(),
        mailProvider = new MailProviderInMemory(), 
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(        
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        )
    })

    it("should be able to send a forgot password mail to user", async () => {
        const sendMail = spyOn(mailProvider, "sendMail")
        await usersRepositoryInMemory.create({
            driver_license: "565656",
            email: "a@a",
            name: "a a",
            password: "123"
        });

        await sendForgotPasswordMailUseCase.execute("a@a")

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exist", async() =>{
        await expect(
            sendForgotPasswordMailUseCase.execute("as@as")
        ).rejects.toEqual(new AppError("User does not exists!"))
    });

    it("should be able to create an users token", async () =>{
        const generateTokenMail = spyOn(usersTokensRepositoryInMemory,"create");

        await usersRepositoryInMemory.create({
            driver_license: "565656",
            email: "ab@ab",
            name: "ae ae",
            password: "123"
        });

        await sendForgotPasswordMailUseCase.execute("ab@ab")

        expect(generateTokenMail).toBeCalled();
    })
})