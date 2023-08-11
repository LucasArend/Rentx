import {Router} from "express"

import { authenticateRoutes } from "./authenticate.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes"
import { specificationRoutes } from "./specification.routes"
import { usersRoutes } from "./users.routes";

const router = Router();

router.use ("/categories", categoriesRoutes);
router.use ("/specification", specificationRoutes );
router.use ("/users", usersRoutes);
router.use (authenticateRoutes);
router.use ("/cars", carsRoutes)

export {router};