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
