import { Application, Context } from "https://deno.land/x/oak@v10.6.0/mod.ts";

const app = new Application();

app.use((ctx: Context) => {
  ctx.response.body = "Testing";
});

await app.listen({ port: 4000 });
