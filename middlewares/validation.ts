// deno-lint-ignore-file no-explicit-any
import type {
  Context,
  Middleware,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { z } from "https://deno.land/x/zod@v3.17.3/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v10.6.0/helpers.ts";

export const validateParams = <T>(schema: z.ZodType<T>): Middleware =>
  (ctx: Context, next) => {
    const params = getQuery(ctx, { mergeParams: true });
    try {
      schema.parse(params);
      return next();
    } catch (e) {
      ctx.throw(
        Status.UnprocessableEntity,
        JSON.stringify({
          "code": "10003",
          "message": "VALIDATION_ERROR",
          "detail": e.issues,
        }),
      );
    }
  };

export const validateBody = <T>(schema: z.ZodType<T>): Middleware =>
  (ctx: Context, next) => {
    try {
      const result = schema.parse(ctx.request.body);
      ctx.request.body = result as any;
      return next();
    } catch (e) {
      ctx.throw(
        Status.UnprocessableEntity,
        JSON.stringify({
          "code": "10003",
          "message": "VALIDATION_ERROR",
          "detail": e.issues,
        }),
      );
    }
  };
