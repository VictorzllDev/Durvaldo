import type {
	ICreateProduct,
	IProduct,
	IProductRepository,
	IUpdateProduct,
} from '../types/IProduct.types'
import { prisma } from '../utils/prisma-client'

export class ProductRepository implements IProductRepository {
	async findById(id: string): Promise<IProduct | null> {
		return await prisma.product.findUnique({
			where: {
				id,
			},
		})
	}

	async save({ name, amount, description }: ICreateProduct): Promise<void> {
		await prisma.product.createMany({
			data: {
				name,
				amount,
				description,
			},
		})
	}

	async getAll(): Promise<IProduct[]> {
		return await prisma.product.findMany()
	}

	async update(
		id: string,
		{ amount, description }: IUpdateProduct,
	): Promise<void> {
		await prisma.product.update({
			where: {
				id,
			},
			data: {
				amount,
				description,
			},
		})
	}

	async delete(id: string): Promise<void> {
		await prisma.product.delete({
			where: {
				id,
			},
		})
	}
}
