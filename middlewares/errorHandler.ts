import { isHttpError, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import type {
  Context,
  Middleware,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";

export const errorHandlerMiddleware: Middleware = async (
  ctx: Context,
  next,
) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      ctx.response.status = err.status;
      ctx.response.body = JSON.parse(err.message);
    } else {
      console.error(err);
      ctx.response.status = Status.InternalServerError;
      ctx.response.body = {
        "code": "10000",
        "message": "SERVER_ERROR",
        "detail": "Unknown error, see error log",
      };
    }
  }
};
