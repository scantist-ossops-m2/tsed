import {Module} from "@tsed/di";
import {myContainer} from "./inversify.config.js";

@Module({
  resolvers: [
    {
      get(token: any) {
        return myContainer.get(token);
      }
    }
  ]
})
export class MyModule {}
