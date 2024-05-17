import {Configuration} from "@tsed/di";
import * as v1Controllers from "./controllers/v1/index.js";
import * as v0Controllers from "./controllers/v0/index.js";

@Configuration({
  mount: {
    "/rest/v1": [...Object.values(v1Controllers)],
    "/rest/v0": [...Object.values(v0Controllers)]
  }
})
export class Server {}

// v1/index.ts
export * from "./users/UserControllers.js";
export * from "./groups/GroupsControllers.js";

// v0/index.ts
export * from "./users/UserControllers.js";
export * from "./groups/GroupsControllers.js";
