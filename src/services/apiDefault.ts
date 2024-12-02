import axios from 'axios'

// Criação da instância do axios com a baseURL
export const apiDefault = axios.create({
	baseURL: 'http://localhost:3333',
})
