import { Application } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { baseRouter } from "./routers/base.ts";
import { quotationRouter } from "./routers/quotation.ts";

const app = new Application();

app.use(baseRouter.routes());
app.use(quotationRouter.routes());

await app.listen({ port: 4000 });
