import type { FastifyInstance } from 'fastify'
import { ProductRepository } from '../repositories/product.repository'
import { ProductUseCase } from '../usecases/product.usecase'
import type { ICreateProduct } from '../types/IProduct.types'
import z from 'zod'

export async function productRoutes(fastify: FastifyInstance) {
	const productRepository = new ProductRepository()
	const productUseCase = new ProductUseCase(productRepository)

	fastify.post<{ Body: ICreateProduct }>('/', async (req, reply) => {
		try {
			const createProductSchema = z.object({
				name: z.string(),
				amount: z.number(),
				description: z.string(),
			})

			const { name, amount, description } = createProductSchema.parse(req.body)

			await productUseCase.createProduct({ name, amount, description })

			return reply.code(201).send()
		} catch (error) {
			return reply.code(400).send(error)
		}
	})
}
