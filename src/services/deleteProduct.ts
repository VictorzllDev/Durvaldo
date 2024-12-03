import { apiDefault } from '@/services/apiDefault'

export async function deleteProductService(id: string): Promise<void> {
	await apiDefault.delete(`/product/${id}/`)
}
