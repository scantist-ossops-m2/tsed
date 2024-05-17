import {Post} from "@tsed/schema";
import {Controller} from "@tsed/di";
import {BodyParams} from "./body-params.js";
import {PersonModel} from "../models/PersonModel";

@Controller("/persons")
export class PersonsController {
  @Post("/")
  save(@BodyParams() person: PersonModel) {
    return person;
  }
}
