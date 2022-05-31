import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.ts";
import { baseRouter } from "./routers/base.ts";
import { swaggerRouter } from "./routers/swagger.ts";
import { quotationRouter } from "./routers/quotation.ts";

const app = new Application();

app.use(errorHandlerMiddleware);

app.use(swaggerRouter.routes());
app.use(quotationRouter.routes());
app.use(baseRouter.routes());

await app.listen({
  port: parseInt(Deno.env.get("PORT") as string ?? 3000, 10),
});
