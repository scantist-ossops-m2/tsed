import {Module} from "@tsed/di";
import {UserController} from "./users/UserController.js";

@Module({
  mount: {
    "/rest/v1": [UserController]
  }
})
export class ModuleV1 {}
