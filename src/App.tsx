import { useRef, useState } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import type { ICreateProduct, IProduct } from './types/IProduct'
import { getAllProductService } from './services/getAllProduct'
import { ThemeProvider } from './components/theme-provider'
import { Header } from './components/Header'
import { Label } from './components/ui/label'
import { DialogClose } from '@radix-ui/react-dialog'
import { createProductService } from './services/createProduct'

export function App() {
	const [products, setProducts] = useState<IProduct[] | null>(null)
	const [formCreate, setFormCreate] = useState<{
		name: string
		description: string
		amount: string
	}>({ name: '', description: '', amount: '' })

	const getProducts = async () => {
		const products = await getAllProductService()
		setProducts(products)
	}
	getProducts()

	const handleCreateProduct = async () => {
		try {
			const { name, description, amount } = formCreate

			if (!name) throw new Error('name invalid!')
			if (!description) throw new Error('description invalid!')
			if (!(Number(amount) >= 0)) throw new Error('amount invalid!')

			await createProductService({ name, description, amount: Number(amount) })
			await getProducts()

			setFormCreate({ name: '', description: '', amount: '' })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Header />
			<main className="px-4 py-3">
				<Table>
					<TableCaption>A list of your recent invoices.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[300px]">ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>description</TableHead>
							<TableHead className="">amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products?.map(({ id, name, amount, description }) => (
							<TableRow key={id}>
								<TableCell className="font-medium">{id}</TableCell>
								<TableCell>{name}</TableCell>
								<TableCell>{description}</TableCell>
								<TableCell className="">{amount}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" className="fixed bottom-4 right-4">
							ADD Product
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>ADD Product</DialogTitle>
							<DialogDescription>
								Make changes to your profile here. Click save when you're done.
							</DialogDescription>
						</DialogHeader>
						<form className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									className="col-span-3"
									onChange={(e) =>
										setFormCreate({
											...formCreate,
											name: e.currentTarget.value,
										})
									}
									value={formCreate.name}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="description" className="text-right">
									Description
								</Label>
								<Input
									id="description"
									className="col-span-3"
									onChange={(e) =>
										setFormCreate({
											...formCreate,
											description: e.currentTarget.value,
										})
									}
									value={formCreate.description}
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="amount" className="text-right">
									Amount
								</Label>
								<Input
									type="number"
									id="amount"
									className="col-span-3"
									onChange={(e) =>
										setFormCreate({
											...formCreate,
											amount: e.currentTarget.value,
										})
									}
									value={formCreate.amount}
								/>
							</div>
						</form>
						<DialogFooter>
							<DialogClose asChild>
								<Button type="button" variant="secondary">
									Cancel
								</Button>
							</DialogClose>
							<Button type="submit" onClick={handleCreateProduct}>
								Done!
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</main>
		</ThemeProvider>
	)
}
