import { app } from "@shared/infra/http/app";
import { hash } from "bcryptjs";
import request from "supertest";
import {v4 as uuid} from "uuid"

import { Connection, createConnection } from "typeorm";

let connection : Connection

describe("Create Category Controller list", () => {
    
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuid();

        const password = await hash("admin",8);

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
            `
        );
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it("should be able to list all categories", async () => {
        const responseToken = await request(app).post("/sessions").send({
            email:"admin@rentx.com.br",
            password:"admin",
        })
        
        const {token} = responseToken.body;

       await request(app).post("/categories").send({
            name:"Category supertest",
            description:"Category Supertest",
        })
        .set({
            Authorization: `Bearer ${token}`
        })

        const response = await request(app).get("/categories")

        console.log(response.body)

        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
    });
});