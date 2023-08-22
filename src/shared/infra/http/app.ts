import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import "express-async-errors";
import swaggerUi from 'swagger-ui-express';

import createConnection  from "@shared/typeorm";

import "../../container"

import {router} from "./routes";
import swaggerFile from '../../../swagger.json';
import { AppError } from "@shared/errors/AppError";

createConnection();
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            message:err.message,
        })
    }

    console.log(err);

    return response.status(500).json({
        status: "error",
        message: `Intenral server error - ${err.message}`,
    })
})

export {app}
