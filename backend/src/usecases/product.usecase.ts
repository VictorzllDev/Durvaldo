import type {
	ICreateProduct,
	IProductRepository,
	IProductUseCase,
} from '../types/IProduct.types'

export class ProductUseCase implements IProductUseCase {
	constructor(private productRepository: IProductRepository) {}

	async createProduct({
		name,
		amount,
		description,
	}: ICreateProduct): Promise<void> {
		if (amount < 0) throw new Error('Oxente! Quantidade negativa nao Existe.')

		await this.productRepository.save({ name, amount, description })
	}
}
