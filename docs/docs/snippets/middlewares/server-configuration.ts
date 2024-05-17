import {Configuration} from "@tsed/di";
import {MyController} from "./controllers/rest/MyController.js";

@Configuration({
  mount: {
    "/rest": [MyController]
  }
})
export class Server {}
