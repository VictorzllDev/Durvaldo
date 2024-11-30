import type {
	ICreateProduct,
	IProduct,
	IProductRepository,
	IProductUseCase,
	IUpdateProduct,
} from '../types/IProduct.types'

export class ProductUseCase implements IProductUseCase {
	constructor(private productRepository: IProductRepository) {}

	async createProduct({
		name,
		amount,
		description,
	}: ICreateProduct): Promise<void> {
		if (amount < 0) throw new Error('Oxente! Quantidade negativa nao Existe.')

		return await this.productRepository.save({ name, amount, description })
	}

	async getAllProduct(): Promise<IProduct[]> {
		return await this.productRepository.getAll()
	}

	async updateProduct(
		id: string,
		{ amount, description }: IUpdateProduct,
	): Promise<void> {
		const productExists = await this.productRepository.findById(id)
		if (!productExists) throw new Error('Product Not Exists.')

		return await this.productRepository.update(id, { amount, description })
	}

	async deleteProduct(id: string): Promise<void> {
		const productExists = await this.productRepository.findById(id)
		if (!productExists) throw new Error('Product Not Exists.')

		return await this.productRepository.delete(id)
	}
}
