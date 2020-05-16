import { Application, Router } from "https://deno.land/x/oak/mod.ts";

interface Chair {
  name: string;
  price: number;
  midCentury: boolean;
}

let chairs: Array<Chair> = [
  {
    name: "Eames",
    price: 500,
    midCentury: true,
  },
  {
    name: "Wassily",
    price: 1000,
    midCentury: true,
  },
  {
    name: "Ashley Chair",
    price: 200,
    midCentury: false,
  },
];

export const getChairs = ({ response }: { response: any }) => {
  response.body = chairs;
};

export const addChairs = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const chair: Chair = body.value;

  chairs.push(chair);
  response.body = { chairAdded: "Success" };
  response.status = 200;
};

const router = new Router();
const app = new Application();

router
  .get("/selection", getChairs)
  .post("/create", addChairs);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 2000 });
