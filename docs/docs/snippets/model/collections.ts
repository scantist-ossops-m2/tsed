import {CollectionOf, getJsonSchema} from "@tsed/schema";
import {Model} from "./primitives.js";
import {Role} from "./Role.js";
import {Security} from "./Security.js";

class User {
  @CollectionOf(Role)
  roles: Role[];

  @CollectionOf(Security)
  securities: Map<string, Security>;

  @CollectionOf(String)
  scopes: Set<string>;
}

console.log(getJsonSchema(Model));
