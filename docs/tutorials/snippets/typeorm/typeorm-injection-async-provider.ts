import {Inject, Injectable} from "@tsed/di";
import {CONNECTION} from "./typeorm-async-provider.js";

@Injectable()
export class UserService {
  constructor(@Inject(CONNECTION) connection: CONNECTION) {}
}
