import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import type { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";

export const baseRouter = new Router();

baseRouter.all(
  "/(.*)",
  (context: Context) => {
    context.response.status = 404;
    context.response.body = {
      "type": "API_ROUTE_NOT_FOUND",
      "code": "10001",
      "detail": "Request API route does not exist",
    };
  },
);
