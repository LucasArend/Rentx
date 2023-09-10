import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayJsDateProvider } from "./DayjsDateProvider.ts/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DayJsDateProvider",
    DayJsDateProvider
)