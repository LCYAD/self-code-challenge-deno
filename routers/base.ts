import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { swaggerDocHanlder } from "../handlers/base.ts";

export const baseRouter = new Router();

baseRouter.get("/api", swaggerDocHanlder);
