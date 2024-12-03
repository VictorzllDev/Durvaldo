import axios from 'axios'

// Criação da instância do axios com a baseURL
export const apiDefault = axios.create({
	baseURL: import.meta.env.VITE_API,
})
