import {Module} from "@tsed/di";
import {MyController} from "./controllers/MyController.js";
import {MyService} from "./services/MyService.js";

@Module({
  mount: {
    "/rest/module1": [MyController]
  },
  imports: [MyService]
})
export class MyModule {}
