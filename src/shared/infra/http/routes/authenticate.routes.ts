import { AuthenticateUserController } from "@modules/accounts/authenticateUser/authenticateUserController";
import { Router } from "express"

const authenticateRoutes = Router();
 
const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post("/sessions", authenticateUserController.handle)

export {authenticateRoutes};