import {UseBefore} from "@tsed/platform-middlewares";
import {useDecorators, StoreSet} from "@tsed/core";
import {AcceptRolesMiddleware} from "./AcceptRolesMiddleware.js";

export function AcceptRoles(...roles: string[]) {
  return useDecorators(UseBefore(AcceptRolesMiddleware), StoreSet(AcceptRolesMiddleware, roles));
}
