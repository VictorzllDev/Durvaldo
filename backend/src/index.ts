import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { productRoutes } from "./routes/product.routes";

const app = fastify();

app.register(fastifyCors, {
	origin: "*",
});

app.register(productRoutes, {
	prefix: "/product",
});

app.listen({ port: 3333, host: "0.0.0.0" }, (err, address) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	console.log(`Run Server ${address}`);
});
