import { Application, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.141.0/testing/asserts.ts";
import { quotationRouter } from "../../../routers/quotation.ts";
import { errorHandlerMiddleware } from "../../../middlewares/errorHandler.ts";
import { COMMON_FIELD } from "../../fakers/common.ts";
import { quotationResponse } from "../../fakers/quotation.ts";
import { get } from "../../mocks/redis.ts";

const path = `/quotations/${COMMON_FIELD.QUOTATION_ID_FIELD}`;

const app = new Application();

app.use(errorHandlerMiddleware);

app.use(quotationRouter.routes());

Deno.test(`GET ${path} - it should return if quotation is found`, async () => {
  get.returns(JSON.stringify(quotationResponse));
  const request = await superoak(app);
  const response = await request.get(path);
  assert(get.calledWith(COMMON_FIELD.QUOTATION_ID_FIELD));
  assertEquals(response.status, Status.OK);
  assertEquals(response.body, quotationResponse);
  get.reset();
});

Deno.test(`GET ${path} - it throw error if quotation is not found`, async () => {
  get.returns(undefined);
  const request = await superoak(app);
  const response = await request.get(path);
  assert(get.calledWith(COMMON_FIELD.QUOTATION_ID_FIELD));
  assertEquals(response.status, Status.NotFound);
  assertEquals(response.body, {
    code: "10004",
    message: "RESOURCES_NOT_FOUND",
    detail: "Quotation not found",
  });
  get.reset();
});

Deno.test(`GET ${path} - it throw error if quotationId is invalid`, async () => {
  get.returns(undefined);
  const request = await superoak(app);
  const response = await request.get("/quotations/xxx");
  assertEquals(get.called, false);
  assertEquals(response.status, Status.UnprocessableEntity);
  assertEquals(response.body, {
    code: "10003",
    message: "VALIDATION_ERROR",
    detail: [
      {
        code: "invalid_string",
        message: "Invalid",
        path: [
          "id",
        ],
        validation: "regex",
      },
    ],
  });
  get.reset();
});
