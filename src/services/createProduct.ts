import { apiDefault } from '@/services/apiDefault'
import type { ICreateProduct } from '@/types/IProduct'

export async function createProductService({
	name,
	amount,
	description,
}: ICreateProduct): Promise<void> {
	await apiDefault.post<ICreateProduct>('/product/', {
		name,
		amount,
		description,
	})
}
