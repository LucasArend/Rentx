import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./DayjsDateProvider.ts/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)