import type { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { getQuery } from "https://deno.land/x/oak@v10.6.0/helpers.ts";
import { customAlphabet } from "https://deno.land/x/nanoid@v3.0.0/mod.ts";
import { redis } from "../utils/redis.ts";
import { generateErrorMessage } from "../utils/error.ts";

export const getQuotationById = async (ctx: Context) => {
  const { id } = getQuery(ctx, { mergeParams: true });
  const quotation = await redis.get(id);
  if (!quotation) {
    ctx.throw(
      404,
      generateErrorMessage("10004", "Quotation not found"),
    );
  } else {
    ctx.response.body = JSON.parse(quotation as string);
  }
};

export const createQuotations = async (ctx: Context) => {
  const now = Date.now();
  const duration = 5 * 60 * 1000;
  const expireAt = new Date(now + duration).toISOString();
  const body = ctx.state.parsedBody;
  const quotations = await Promise.all(
    body.map(async (quotation: Record<string, unknown>) => {
      const quotationId = await customAlphabet("0123456789", 12)();
      return {
        ...quotation,
        quotationId,
        expireAt,
      };
    }),
  );
  await Promise.all(
    quotations.map((q: Record<string, unknown>) =>
      redis.set(q.quotationId as string, JSON.stringify(q))
    ),
  );
  ctx.response.body = quotations;
};
