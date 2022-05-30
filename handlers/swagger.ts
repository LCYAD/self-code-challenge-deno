import type { Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import type { ResponseBody } from "https://deno.land/x/oak@v10.6.0/response.ts";
import { parse } from "https://deno.land/std@0.140.0/encoding/yaml.ts";

export const swaggerDocHanlder = async (ctx: Context) => {
  const swaggerStr = await Deno.readTextFile("./openapi.yml");
  const swaggerJSON = parse(swaggerStr) as ResponseBody;
  ctx.response.body = swaggerJSON;
};
