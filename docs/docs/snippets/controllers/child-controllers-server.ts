import {Configuration} from "@tsed/di";
import {RestCtrl} from "./controllers/RestCtrl.js";

@Configuration({
  mount: {
    "/": [RestCtrl]
  }
})
export class Server {}
