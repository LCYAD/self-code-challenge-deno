import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.ts";
import { baseRouter } from "./routers/base.ts";
import { swaggerRouter } from "./routers/swagger.ts";
import { quotationRouter } from "./routers/quotation.ts";

const app = new Application();

app.use(errorHandlerMiddleware);

app.use(swaggerRouter.routes());
app.use(quotationRouter.routes());
app.use(baseRouter.routes());

await app.listen({ port: 4000 });
