import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

export function App() {
	return (
		<main className="px-4 py-3">
			<div className="flex gap-2">
				<Input type="text" placeholder="Nome" />
				<Input type="number" placeholder="Quantidade" />
				<Input type="text" placeholder="Descricao" />
				<Button type="submit">ADD</Button>
			</div>
		</main>
	)
}
