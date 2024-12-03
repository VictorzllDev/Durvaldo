import { apiDefault } from '@/services/apiDefault'
import type { IProduct } from '@/types/IProduct'

export async function getAllProductService(): Promise<IProduct[]> {
	const { data } = await apiDefault.get<IProduct[]>('/product/', {})

	return data as IProduct[]
}
