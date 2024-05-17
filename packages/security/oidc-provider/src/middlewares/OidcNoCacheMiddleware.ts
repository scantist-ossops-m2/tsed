import {Context, Middleware, MiddlewareMethods, PlatformContext} from "@tsed/common";

@Middleware()
export class OidcNoCacheMiddleware implements MiddlewareMethods {
  use(@Context() ctx: PlatformContext) {
    ctx.response.setHeader("Pragma", "no-cache");
    ctx.response.setHeader("Cache-Control", "no-cache, no-store");
  }
}
