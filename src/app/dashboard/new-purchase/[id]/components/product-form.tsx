'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'sonner';

import { addProductAction } from '@/actions/product-actions/add-product-action';
import { editProductAction } from '@/actions/product-actions/edit-product-action';
import {
	ProductSchema,
	productSchema,
} from '@/actions/product-actions/product-schema';
import { SubmitButton } from '@/app/components/shared/submit-button';
import { useAddProductModal } from '@/app/dashboard/contexts/add-product-modal-context';
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
import { stringUtils } from '@/helpers/string-utils';

import { PRODUCT_CATEGORIES } from '../constants/product-categories';

interface ProductFormProps {
	actionMode: 'add' | 'edit';
	initialData?: ProductSchema;
	productId?: string;
	onSuccess?: () => void;
}

const ProductForm = ({
	actionMode,
	initialData,
	productId,
	onSuccess,
}: ProductFormProps) => {
	const [isPending, startTransition] = useTransition();
	const { closeAllModals } = useAddProductModal();
	const params = useParams();
	const purchaseId = params.id as string;

	const form = useForm<ProductSchema>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: initialData?.name || '',
			category: initialData?.category || '',
			price: initialData?.price || 0,
			quantity: initialData?.quantity || 1,
			description: initialData?.description || '',
		},
	});

	const handleSubmit = form.handleSubmit(async (data: ProductSchema) => {
		startTransition(async () => {
			try {
				const response =
					actionMode === 'add'
						? await addProductAction({ ...data, purchaseId })
						: await editProductAction({ ...data, id: productId! });

				if (response.error) {
					toast.error(response.error);
					return;
				}

				if (response.success) {
					toast.success(response.success);
					form.reset();
					closeAllModals();
					onSuccess?.();
				}
			} catch (error) {
				console.error(error);
			}
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="flex h-full flex-col">
				<div className="flex h-full flex-auto flex-col gap-6">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome do Produto</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="text"
										disabled={isPending}
										placeholder="Digite o nome do produto"
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
									value={field.value}
									disabled={isPending}
								>
									<FormControl>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Selecione uma categoria" />
										</SelectTrigger>
									</FormControl>
									<SelectContent className="h-72">
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

					<div className="grid grid-cols-2 gap-6 md:grid-cols-2">
						<FormField
							control={form.control}
							name="price"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Preço (R$)</FormLabel>
									<FormControl>
										<Input
											type="text"
											value={
												field.value
													? stringUtils.formatToCurrencyBRL(field.value)
													: ''
											}
											onChange={e =>
												stringUtils.handlePriceChange(e, field.onChange)
											}
											placeholder="R$ 0,00"
											className="peer pe-9"
											disabled={isPending}
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
								<FormItem>
									<FormLabel>Quantidade</FormLabel>
									<FormControl>
										<NumericFormat
											customInput={Input}
											value={field.value}
											onValueChange={values => {
												field.onChange(values.floatValue || 1);
											}}
											decimalScale={0}
											allowNegative={false}
											min={1}
											placeholder="1"
											disabled={isPending}
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
								<FormLabel>Descrição (Opcional)</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										disabled={isPending}
										placeholder="Ex: Arroz Tio João (opcional)"
										rows={3}
										className="h-32 resize-none placeholder:text-sm"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<SubmitButton
					isLoading={isPending}
					loadingText={
						actionMode === 'add'
							? 'Adicionando produto...'
							: 'Atualizando produto...'
					}
				>
					{actionMode === 'add' ? 'Adicionar Produto' : 'Atualizar Produto'}
				</SubmitButton>
			</form>
		</Form>
	);
};

export default ProductForm;
