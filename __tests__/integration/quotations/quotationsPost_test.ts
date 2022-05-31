import { Application, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.141.0/testing/asserts.ts";
import omit from "https://cdn.skypack.dev/lodash/omit";
import {
  returnsNext,
  stub,
} from "https://deno.land/std@0.137.0/testing/mock.ts";
import { quotationRouter } from "../../../routers/quotation.ts";
import { errorHandlerMiddleware } from "../../../middlewares/errorHandler.ts";
import { COMMON_FIELD } from "../../fakers/common.ts";
import { quotationResponse } from "../../fakers/quotation.ts";
import { set } from "../../mocks/redis.ts";
import { customAlphabet } from "../../mocks/nanoid.ts";

const path = `/quotations`;

const app = new Application();

app.use(errorHandlerMiddleware);

app.use(quotationRouter.routes());

stub(
  Date,
  "now",
  returnsNext([
    COMMON_FIELD.CURRENT_TIME_MILLI_SEC,
    COMMON_FIELD.CURRENT_TIME_MILLI_SEC,
  ]),
);

Deno.test(`POST ${path} - it should set quotations to redis`, async () => {
  const quotationRequestBody = omit(quotationResponse, [
    "expireAt",
    "quotationId",
  ]);
  customAlphabet.returns(() => COMMON_FIELD.QUOTATION_ID_FIELD);
  const request = await superoak(app);
  const response = await request.post(path).send([quotationRequestBody]);
  assertEquals(response.status, Status.Created);
  assert(
    set.calledOnceWith(
      COMMON_FIELD.QUOTATION_ID_FIELD,
      JSON.stringify({
        ...quotationRequestBody,
        quotationId: COMMON_FIELD.QUOTATION_ID_FIELD,
        expireAt: COMMON_FIELD.AFTER_5_MINS_CURRENT_TIME,
      }),
    ),
  );
  assertEquals(response.body, [quotationResponse]);
  set.reset();
  customAlphabet.reset();
});

Deno.test(`POST ${path} - it should throw error if body is invalid`, async () => {
  const quotationRequestBody = omit(quotationResponse, [
    "expireAt",
    "quotationId",
    "deliveryBy",
  ]);
  const request = await superoak(app);
  const response = await request.post(path).send([quotationRequestBody]);
  assertEquals(response.status, Status.UnprocessableEntity);
  assertEquals(
    set.called,
    false,
  );
  assertEquals(response.body, {
    code: "10003",
    message: "VALIDATION_ERROR",
    detail: [
      {
        code: "invalid_type",
        expected: "string",
        message: "Required",
        path: [0, "deliveryBy"],
        received: "undefined",
      },
    ],
  });
  set.reset();
});
