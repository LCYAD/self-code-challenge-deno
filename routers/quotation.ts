import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { z } from "https://deno.land/x/zod@v3.17.3/mod.ts";
import { createQuotations, getQuotationById } from "../handlers/quotation.ts";
import { validateParams } from "../middlewares/validation.ts";

const router = new Router();

const GetQuotationByIdSchema = z.object({
  id: z.string().regex(/^[0-9]{12}$/),
}).strip();

router.get("/:id", validateParams(GetQuotationByIdSchema), getQuotationById)
  .post("/", createQuotations);

export const quotationRouter = new Router().use(
  "/quotations",
  router.routes(),
  router.allowedMethods(),
);
