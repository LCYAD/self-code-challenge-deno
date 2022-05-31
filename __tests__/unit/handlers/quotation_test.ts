import { testing } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.141.0/testing/asserts.ts";
import omit from "https://cdn.skypack.dev/lodash/omit";
import {
  returnsNext,
  stub,
} from "https://deno.land/std@0.137.0/testing/mock.ts";
import {
  createQuotations,
  getQuotationById,
} from "../../../handlers/quotation.ts";
import { quotationResponse } from "../../fakers/quotation.ts";
import { COMMON_FIELD } from "../../fakers/common.ts";
import { get, set } from "../../mocks/redis.ts";
import { customAlphabet } from "../../mocks/nanoid.ts";
import { generateErrorMessage } from "../../../utils/error.ts";

Deno.test({
  name: "getQuotationById - should return if quotation found",
  async fn() {
    const ctx = testing.createMockContext({
      params: { id: COMMON_FIELD.QUOTATION_ID_FIELD as string },
    });
    get.returns(JSON.stringify(quotationResponse));
    await getQuotationById(ctx);
    assert(get.calledWith(COMMON_FIELD.QUOTATION_ID_FIELD));
    assertEquals(ctx.response.body, quotationResponse);
  },
});

Deno.test({
  name: "getQuotationById - should throw error if quotation is not found",
  async fn() {
    const ctx = testing.createMockContext({
      params: { id: COMMON_FIELD.QUOTATION_ID_FIELD as string },
    });
    get.returns(undefined);
    try {
      await getQuotationById(ctx);
    } catch (e) {
      assert(get.calledWith(COMMON_FIELD.QUOTATION_ID_FIELD));
      assertEquals(e.status, 404);
      assertEquals(
        e.message,
        generateErrorMessage("10004", "Quotation not found"),
      );
    }
  },
});

Deno.test({
  name: "createQuotations - should add quotations to redis",
  async fn() {
    const quotationRequestBody = omit(quotationResponse, [
      "expireAt",
      "quotationId",
    ]);
    const ctx = testing.createMockContext({
      state: { parsedBody: [quotationRequestBody] },
    });
    stub(
      Date,
      "now",
      returnsNext([COMMON_FIELD.CURRENT_TIME_MILLI_SEC]),
    );
    customAlphabet.returns(() => COMMON_FIELD.QUOTATION_ID_FIELD);
    await createQuotations(ctx);
    assert(
      set.calledWith(
        COMMON_FIELD.QUOTATION_ID_FIELD,
        JSON.stringify({
          ...quotationRequestBody,
          quotationId: COMMON_FIELD.QUOTATION_ID_FIELD,
          expireAt: COMMON_FIELD.AFTER_5_MINS_CURRENT_TIME,
        }),
      ),
    );
    assertEquals(ctx.response.body, [quotationResponse]);
  },
});
