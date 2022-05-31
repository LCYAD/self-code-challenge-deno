import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { createQuotations, getQuotationById } from "../handlers/quotation.ts";
import { validateBody, validateParams } from "../middlewares/validation.ts";
import {
  GetQuotationsByIdSchema,
  PostQuotationsReqBodySchema,
} from "./schemas/quotation.ts";

const router = new Router();

router.get("/:id", validateParams(GetQuotationsByIdSchema), getQuotationById);
router.post("/", validateBody(PostQuotationsReqBodySchema), createQuotations);

export const quotationRouter = new Router().use(
  "/quotations",
  router.routes(),
  router.allowedMethods(),
);
