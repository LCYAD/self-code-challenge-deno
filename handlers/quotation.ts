import type { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v10.6.0/helpers.ts";

export const getQuotationById = (ctx: Context) => {
  console.log(getQuery(ctx, { mergeParams: true }));
  ctx.response.body = { quotation: "getById" };
};

export const createQuotations = async (ctx: Context) => {
  console.log(await ctx.request.body().value);
  ctx.response.body = { quotation: "createQuotations" };
};
