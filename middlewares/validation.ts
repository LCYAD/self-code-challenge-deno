import type {
  Context,
  Middleware,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { z } from "https://deno.land/x/zod@v3.17.3/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v10.6.0/helpers.ts";
import { generateErrorMessage } from "../utils/error.ts";

export const validateParams = <T>(schema: z.ZodType<T>): Middleware =>
  (ctx: Context, next) => {
    const params = getQuery(ctx, { mergeParams: true });
    try {
      schema.parse(params);
      return next();
    } catch (e) {
      ctx.throw(
        Status.UnprocessableEntity,
        generateErrorMessage("10003", e.issues),
      );
    }
  };

export const validateBody = <T>(schema: z.ZodType<T>): Middleware =>
  async (ctx: Context, next) => {
    const body = await ctx.request.body().value;
    try {
      const result = schema.parse(body);
      ctx.state.parsedBody = result;
      return next();
    } catch (e) {
      ctx.throw(
        Status.UnprocessableEntity,
        generateErrorMessage("10003", e.issues),
      );
    }
  };
