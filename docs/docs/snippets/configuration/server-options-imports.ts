import {Configuration} from "@tsed/di";
import {MyModule} from "./module/MyModule.js";

@Configuration({
  imports: [MyModule]
})
export class Server {}
