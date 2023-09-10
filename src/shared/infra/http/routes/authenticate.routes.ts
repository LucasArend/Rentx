import { AuthenticateUserController } from "@modules/accounts/authenticateUser/authenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/RefreshToken/RefreshTokenController";
import { Router } from "express"

const authenticateRoutes = Router();
 
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle)
authenticateRoutes.post("/refresh-token", refreshTokenController.handle)

export {authenticateRoutes};