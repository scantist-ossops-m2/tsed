import {Type} from "@tsed/core";
import {registerPlatformAdapter} from "../utils/registerPlatformAdapter.js";

export function PlatformProvider(): ClassDecorator {
  return (klass) => {
    registerPlatformAdapter(klass as unknown as Type);
  };
}
