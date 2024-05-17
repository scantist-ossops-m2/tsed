import {Module} from "@tsed/di";
import {UserController} from "./users/UserController.js";

@Module({
  mount: {
    "/rest/v0": [UserController]
  }
})
export class ModuleV0 {}
