'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { SubmitButton } from '@/app/components/shared/submit-button';
import { useAddProductMutation } from '@/app/dashboard/hooks/mutations/use-add-product';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useAddProductModal } from '../../../contexts/add-product-modal-context';
import { PRODUCT_CATEGORIES } from '../constants/product-categories';
import { AddProductFormSchema, addProductFormSchema } from '../schemas/product-schema';

interface AddProductFormProps {
	setIsSidebarOpen?: (isOpen: boolean) => void;
}

const AddProductForm = ({
	setIsSidebarOpen,
}: AddProductFormProps) => {
	const params = useParams();
	const router = useRouter();
	const purchaseId = params.id as string;
	const { closeAllModals } = useAddProductModal();
	
	const addProductMutation = useAddProductMutation(purchaseId);

	const form = useForm<AddProductFormSchema>({
		resolver: zodResolver(addProductFormSchema),
		defaultValues: {
			name: '',
			category: '',
			price: '',
			quantity: '',
			description: '',
		},
	});

	const handleAddProduct = form.handleSubmit(async data => {
		try {
			// Converter strings para números
			const productData = {
				...data,
				price: parseFloat(data.price),
				quantity: parseInt(data.quantity, 10),
			};

			// Validar se os números são válidos
			if (isNaN(productData.price) || productData.price <= 0) {
				toast.error('Preço deve ser um número válido maior que zero');
				return;
			}

			if (isNaN(productData.quantity) || productData.quantity <= 0) {
				toast.error('Quantidade deve ser um número válido maior que zero');
				return;
			}

			const result = await addProductMutation.mutateAsync(productData);
			
			if (result.error) {
				toast.error(result.error);
				return;
			}

			toast.success(result.success);
			form.reset();
			closeAllModals();
			setIsSidebarOpen?.(false);
			router.refresh();
		} catch (error) {
			console.error(error);
			toast.error('Erro ao adicionar produto');
		}
	});

	return (
		<Form {...form}>
			<form
				onSubmit={handleAddProduct}
				className="flex h-full flex-col gap-4 pb-4"
			>
				<div className="flex flex-auto flex-col gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={addProductMutation.isPending}
										placeholder="Nome do Produto"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Categoria</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione uma categoria" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{PRODUCT_CATEGORIES.map(category => (
											<SelectItem key={category.value} value={category.value}>
												{category.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-row items-center gap-2">
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem className="w-full md:w-auto">
									<FormLabel>Preço</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											step="0.01"
											min="0"
											disabled={addProductMutation.isPending}
											placeholder="0.00"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="quantity"
							render={({ field }) => (
								<FormItem className="w-full md:w-auto">
									<FormLabel>Quantidade</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="number"
											min="1"
											disabled={addProductMutation.isPending}
											placeholder="1"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Descrição</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={addProductMutation.isPending}
										placeholder="Descrição do Produto"
										className="h-28 resize-none placeholder:text-sm"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<SubmitButton isLoading={addProductMutation.isPending} className="w-full">
					Adicionar Produto
				</SubmitButton>
			</form>
		</Form>
	);
};

export default AddProductForm;
