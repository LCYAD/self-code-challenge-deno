import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { createQuotations, getQuotationById } from "../handlers/quotation.ts";

const router = new Router();

router.get("/:id", getQuotationById).post("/", createQuotations);

export const quotationRouter = new Router().use(
  "/quotations",
  router.routes(),
  router.allowedMethods(),
);
