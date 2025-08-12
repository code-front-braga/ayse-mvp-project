import z from 'zod';

import { stringUtils } from '@/helpers/string-utils';

import { categoryValues } from '../constants/product-categories';

// Schema para o formulário (com strings)
export const addProductFormSchema = z.object({
	name: z
		.string()
		.min(1, 'Nome é obrigatório.')
		.trim()
		.transform(stringUtils.toTitleCase),
	category: z.enum(categoryValues, {
		error: 'Selecione uma categoria válida.',
	}),
	price: z
		.string()
		.min(1, 'Preço é obrigatório.')
		.refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
			message: 'Preço deve ser um número válido maior que zero.',
		}),
	quantity: z
		.string()
		.min(1, 'Quantidade é obrigatória.')
		.refine(val => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
			message: 'Quantidade deve ser um número válido maior que zero.',
		}),
	description: z.string().trim(),
});

// Schema para a action (com números)
export const addProductSchema = z.object({
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

export type AddProductFormSchema = z.infer<typeof addProductFormSchema>;
export type AddProductSchema = z.infer<typeof addProductSchema>;
