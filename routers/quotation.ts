import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { z } from "https://deno.land/x/zod@v3.17.3/mod.ts";
import { createQuotations, getQuotationById } from "../handlers/quotation.ts";
import { validateBody, validateParams } from "../middlewares/validation.ts";
import {
  iso8601Regex,
  latRegex,
  lngRegex,
  quotationIdRegex,
} from "../constants/regex.ts";

const router = new Router();

const GetQuotationsByIdSchema = z.object({
  id: z.string().regex(quotationIdRegex),
}).strip();

const PostQuotationsReqBodySchema = z.array(
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
  }).strip(),
);

router.get("/:id", validateParams(GetQuotationsByIdSchema), getQuotationById);
router.post("/", validateBody(PostQuotationsReqBodySchema), createQuotations);

export const quotationRouter = new Router().use(
  "/quotations",
  router.routes(),
  router.allowedMethods(),
);
