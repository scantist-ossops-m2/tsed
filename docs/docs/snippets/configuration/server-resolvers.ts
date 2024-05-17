import {Configuration} from "@tsed/di";
import {myContainer} from "./inversify.config.js";

@Configuration({
  resolvers: [
    {
      get(token: any) {
        return myContainer.get(token);
      }
    }
  ]
})
export class Server {}
