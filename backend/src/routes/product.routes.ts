import type { FastifyInstance } from 'fastify'
import { ProductRepository } from '../repositories/product.repository'
import { ProductUseCase } from '../usecases/product.usecase'
import type { ICreateProduct, IUpdateProduct } from '../types/IProduct.types'
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

	fastify.get('/', async (_req, reply) => {
		try {
			const products = await productUseCase.getAllProduct()
			return reply.code(200).send(products)
		} catch (error) {
			return reply.code(400).send(error)
		}
	})

	fastify.put<{ Body: IUpdateProduct; Params: { id: string } }>(
		'/:id/',
		async (req, reply) => {
			try {
				const updateParamsSchema = z.object({
					id: z.string(),
				})

				const updateProductSchema = z.object({
					amount: z.number().optional(),
					description: z.string().optional(),
				})

				const { id } = updateParamsSchema.parse(req.params)
				const { amount, description } = updateProductSchema.parse(req.body)

				await productUseCase.updateProduct(id, { amount, description })

				return reply.code(201).send()
			} catch (error) {
				return reply.code(400).send(error)
			}
		},
	)

	fastify.delete<{ Params: { id: string } }>('/:id/', async (req, reply) => {
		try {
			const updateParamsSchema = z.object({
				id: z.string(),
			})

			const { id } = updateParamsSchema.parse(req.params)

			await productUseCase.deleteProduct(id)

			return reply.code(201).send()
		} catch (error) {
			return reply.code(400).send(error)
		}
	})
}
