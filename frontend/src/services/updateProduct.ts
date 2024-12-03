import { apiDefault } from '@/services/apiDefault'
import type { IUpdateProduct } from '@/types/IProduct'

export async function updateProductService(
	id: string,
	{ amount, description }: IUpdateProduct,
): Promise<void> {
	await apiDefault.put<IUpdateProduct>(`/product/${id}/`, {
		amount,
		description,
	})
}
