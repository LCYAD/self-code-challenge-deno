import type { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";

export const swaggerDocHanlder = (ctx: Context) => {
  ctx.response.body = { api: "/" };
};
