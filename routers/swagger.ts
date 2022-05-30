import { Router } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { swaggerDocHanlder } from "../handlers/swagger.ts";

export const swaggerRouter = new Router();

swaggerRouter.get("/api", swaggerDocHanlder);
