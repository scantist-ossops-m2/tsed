import "@tsed/ajv";
import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import "@tsed/platform-express";
import "@tsed/socketio";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import {resolve} from "path";
import {AwsCtrl} from "./controllers/AwsCtrl";

const rootDir = resolve(__dirname);

@Configuration({
  rootDir,
  httpPort: 8001,
  httpsPort: false,
  logger: {
    level: "info",
    logRequest: true
  },
  mount: {
    "/": [AwsCtrl]
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  public $beforeRoutesInit(): void {
    this.app
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride());

    this.app.getApp().set("trust proxy", 1);
  }
}
