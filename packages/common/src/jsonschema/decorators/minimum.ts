import {decoratorSchemaFactory} from "../utils/decoratorSchemaFactory";

/**
 * The value of `minimum` MUST be a number, representing an inclusive upper limit for a numeric instance.
 *
 * If the instance is a number, then this keyword validates only if the instance is greater than or exactly equal to `minimum`.
 *
 * ::: warning
 * This decorator will be removed in v7.
 * For v6 user, use @@Minimum@@ from @tsed/schema instead of @tsed/common.
 * :::
 *
 * ## Example
 * ### With primitive type
 *
 * ```typescript
 * class Model {
 *    @Minimum(10)
 *    property: number;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "number",
 *       "minimum": 10
 *     }
 *   }
 * }
 * ```
 *
 * ### With array type
 *
 * ```typescript
 * class Model {
 *    @Minimum(10)
 *    @CollectionOf(Number)
 *    property: number[];
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * {
 *   "type": "object",
 *   "properties": {
 *     "property": {
 *       "type": "array",
 *       "items": {
 *          "type": "number",
 *          "minimum": 10
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param {number} minimum The minimum value allowed
 * @param {boolean} exclusive
 * @decorator
 * @validation
 * @swagger
 * @schema
 */
export function Minimum(minimum: number, exclusive: boolean = false) {
  return decoratorSchemaFactory((schema) => {
    if (exclusive) {
      schema.mapper.exclusiveMinimum = minimum;
    } else {
      schema.mapper.minimum = minimum;
    }
  });
}