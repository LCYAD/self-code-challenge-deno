import { z } from "https://deno.land/x/zod@v3.17.3/mod.ts";
import {
  iso8601Regex,
  latRegex,
  lngRegex,
  quotationIdRegex,
} from "../../constants/regex.ts";

export const GetQuotationsByIdSchema = z.object({
  id: z.string().regex(quotationIdRegex),
}).strip();

export const PostQuotationsReqBodySchema = z.array(
  z.object({
    scheduleAt: z.string().regex(iso8601Regex),
    deliveryBy: z.string().regex(iso8601Regex),
    stops: z.array(z.object({
      coordinates: z.object({
        lat: z.string().regex(latRegex),
        lng: z.string().regex(lngRegex),
      }).strip().optional(),
      address: z.string(),
    })).min(2).max(2),
    location: z.string(),
    item: z.object({
      quantity: z.number(),
      weight: z.number(),
      categories: z.array(z.string()),
      handlingInstructions: z.array(z.string()),
    }).strip().optional(),
  }).strip().superRefine((val, ctx) => {
    const now = Date.now();
    const scheduleAtMilliSecs = val.scheduleAt
      ? new Date(val.scheduleAt).getTime()
      : 0;
    const deliveryByAtMilliSecs = val.deliveryBy
      ? new Date(val.deliveryBy).getTime()
      : 0;
    if (scheduleAtMilliSecs < now) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "scheduleAt must have after current time",
        path: ["scheduleAt"],
      });
    }
    if (deliveryByAtMilliSecs < now) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "deliveryBy must have after current time",
        path: ["deliveryBy"],
      });
    }
    if (deliveryByAtMilliSecs <= scheduleAtMilliSecs) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "deliveryBy must be later than scheduledAt",
        path: ["deliveryBy"],
      });
    }
  }),
);
