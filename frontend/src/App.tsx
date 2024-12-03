import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { DialogClose } from '@radix-ui/react-dialog'
import { useState } from 'react'
import { Header } from './components/Header'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { createProductService } from './services/createProduct'
import { getAllProductService } from './services/getAllProduct'
import type { IProduct } from './types/IProduct'
import { updateProductService } from './services/updateProduct'
import { deleteProductService } from './services/deleteProduct'

export function App() {
	const [products, setProducts] = useState<IProduct[] | null>(null)
	const [formCreate, setFormCreate] = useState<{
		name: string
		description: string
		amount: string
	}>({ name: '', description: '', amount: '' })

	const [formUpdate, setFormUpdate] = useState<{
		description: string
		amount: string
	}>({ description: '', amount: '' })

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

			toast.success('Product create with Success!')
		} catch (error) {
			console.log(error)
			toast.error('Error, Durvaldo deve saber')
		}
	}

	const handleUpdateProduct = async (id: string) => {
		try {
			const { description, amount } = formUpdate

			if (!description) throw new Error('description invalid!')
			if (!(Number(amount) >= 0)) throw new Error('amount invalid!')

			await updateProductService(id, { description, amount: Number(amount) })
			await getProducts()

			setFormUpdate({ description: '', amount: '' })

			toast.success('Product update with Success!')
		} catch (error) {
			console.log(error)
			toast.error('Error, Durvaldo deve saber')
		}
	}

	const handleDeleteProduct = async (id: string) => {
		try {
			await deleteProductService(id)
			await getProducts()

			toast.success('Product delete with Success!')
		} catch (error) {
			console.log(error)
			toast.error('Error, Durvaldo deve saber')
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
							<TableHead className="" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{products?.map(({ id, name, amount, description }) => (
							<TableRow key={id}>
								<TableCell className="font-medium">{id}</TableCell>
								<TableCell>{name}</TableCell>
								<TableCell>{description}</TableCell>
								<TableCell className="">{amount}</TableCell>
								<TableCell className="space-x-2">
									<Dialog>
										<DialogTrigger asChild>
											<Button variant="outline">Edit</Button>
										</DialogTrigger>
										<DialogContent className="sm:max-w-[425px]">
											<DialogHeader>
												<DialogTitle>Edit Product</DialogTitle>
												<DialogDescription>
													Make changes to your profile here. Click save when
													you're done.
												</DialogDescription>
											</DialogHeader>
											<form className="grid gap-4 py-4">
												<div className="grid grid-cols-4 items-center gap-4">
													<Label htmlFor="description" className="text-right">
														Description
													</Label>
													<Input
														id="description"
														className="col-span-3"
														onChange={(e) =>
															setFormUpdate({
																...formUpdate,
																description: e.currentTarget.value,
															})
														}
														defaultValue={description}
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
															setFormUpdate({
																...formUpdate,
																amount: e.currentTarget.value,
															})
														}
														defaultValue={amount}
													/>
												</div>
											</form>
											<DialogFooter>
												<DialogClose asChild>
													<Button type="button" variant="secondary">
														Cancel
													</Button>
												</DialogClose>
												<DialogClose>
													<Button
														type="submit"
														onClick={() => handleUpdateProduct(id)}
													>
														Done!
													</Button>
												</DialogClose>
											</DialogFooter>
										</DialogContent>
									</Dialog>
									<Button
										variant="destructive"
										onClick={() => handleDeleteProduct(id)}
									>
										Delete
									</Button>
								</TableCell>
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
				<Toaster position="top-right" />
			</main>
		</ThemeProvider>
	)
}
