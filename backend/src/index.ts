import fastify from 'fastify'
import { productRoutes } from './routes/product.routes'

const app = fastify()

app.register(productRoutes, {
	prefix: '/product',
})

app.listen({ port: 3333 }, (err, address) => {
	if (err) {
		console.log(err)
		process.exit(1)
	}
	console.log(`Run Server ${address}`)
})
