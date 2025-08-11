'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { SubmitButton } from '@/app/components/shared/submit-button';
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

import { PRODUCT_CATEGORIES } from '../constants/product-categories';
import { AddProductSchema, addProductSchema } from '../schemas/product-schema';

const AddProductForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<AddProductSchema>({
		resolver: zodResolver(addProductSchema),
		defaultValues: {
			name: '',
			category: '',
			price: 0,
			quantity: 0,
			description: '',
		},
	});

	const handleAddProduct = form.handleSubmit(async data => {
		startTransition(async () => {
			console.log(data);
		});
	});

	return (
		<Form {...form}>
			<form onSubmit={handleAddProduct} className="space-y-4">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
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
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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

				<div className="flex flex-col items-center gap-2 md:flex-row">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full md:w-auto">
								<FormLabel>Preço</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="Preço do Produto"
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
										disabled={isPending}
										placeholder="Quantidade do Produto"
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
									disabled={isPending}
									placeholder="Descrição do Produto"
									className="h-28 resize-none placeholder:text-sm"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<SubmitButton isLoading={isPending}>Adicionar Produto</SubmitButton>
			</form>
		</Form>
	);
};

export default AddProductForm;
