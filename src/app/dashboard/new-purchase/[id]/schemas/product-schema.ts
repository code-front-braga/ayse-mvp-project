import z from 'zod';

import { stringUtils } from '@/helpers/string-utils';

import { categoryValues } from '../constants/product-categories';

export const addProductSchema = z.object({
	name: z
		.string()
		.min(1, 'Nome é obrigatório.')
		.trim()
		.transform(stringUtils.toTitleCase),
	category: z.enum(categoryValues, {
		error: 'Selecione uma categoria válida.',
	}),
	price: z.number().min(1, 'Preço deve ser maior ou igual a um.'),
	quantity: z.number().min(1, 'Quantidade deve ser maior ou igual a um.'),
	description: z.string().trim(),
});

export type AddProductSchema = z.infer<typeof addProductSchema>;
