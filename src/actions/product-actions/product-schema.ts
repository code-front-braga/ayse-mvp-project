import z from 'zod';

import { stringUtils } from '@/helpers/string-utils';

import { categoryValues } from '../../app/dashboard/new-purchase/[id]/constants/product-categories';

export const productSchema = z.object({
	name: z
		.string()
		.min(1, 'Nome é obrigatório.')
		.trim()
		.transform(stringUtils.toTitleCase),
	category: z.enum(categoryValues, {
		error: 'Selecione uma categoria válida.',
	}),
	price: z.number().min(0.01, 'Preço deve ser maior que zero.'),
	quantity: z.number().int().min(1, 'Quantidade deve ser maior ou igual a um.'),
	description: z.string().trim(),
});

export type ProductSchema = z.infer<typeof productSchema>;

export const deleteProductSchema = z.object({
	id: z.uuid({ error: 'ID do produto é obrigatório.' }),
});

export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
