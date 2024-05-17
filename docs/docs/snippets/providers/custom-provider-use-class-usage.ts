import {Injectable} from "@tsed/di";
import {ConfigService} from "./ConfigService.js";

@Injectable()
export class MyService {
  constructor(configService: ConfigService) {
    console.log(process.env.NODE_ENV, configService); // DevConfigService or ConfigService
  }
}
