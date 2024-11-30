export interface IProduct {
	id: string
	name: string
	amount: number
	description: string
}

export interface ICreateProduct {
	name: string
	amount: number
	description: string
}

export interface IUpdateProduct {
	amount?: number
	description?: string
}

export interface IProductUseCase {
	createProduct(data: ICreateProduct): Promise<void>
	getAllProduct(): Promise<IProduct[]>
	updateProduct(id: string, data: IUpdateProduct): Promise<void>
	deleteProduct(id: string): Promise<void>
}

export interface IProductRepository {
	findById(id: string): Promise<IProduct | null>
	save(data: ICreateProduct): Promise<void>
	getAll(): Promise<IProduct[]>
	update(id: string, data: IUpdateProduct): Promise<void>
	delete(id: string): Promise<void>
}
