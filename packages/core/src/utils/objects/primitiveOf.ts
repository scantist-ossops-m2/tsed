import {isBoolean, isBooleanOrBooleanClass} from "./isBoolean.js";
import {isNumber, isNumberOrNumberClass} from "./isNumber.js";
import {isString, isStringOrStringClass} from "./isString.js";

export function primitiveOf(target: any): "string" | "number" | "boolean" | "any" {
  if (isStringOrStringClass(target)) {
    return "string";
  }

  if (isNumberOrNumberClass(target)) {
    return "number";
  }

  if (isBooleanOrBooleanClass(target)) {
    return "boolean";
  }

  return "any";
}
