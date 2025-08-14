import z from 'zod';

import { stringUtils } from '@/helpers/string-utils';

export const createPurchaseSchema = z.object({
	supermarket: z
		.string()
		.min(1, 'Campo obrigatório')
		.trim()
		.transform(stringUtils.toTitleCase),
	address: z
		.string()
		.min(1, 'Campo obrigatório')
		.trim()
		.transform(stringUtils.toTitleCase),
	date: z
		.date()
		.refine(date => date <= new Date(), 'A data não pode ser no futuro'),
});

export type CreatePurchaseSchema = z.infer<typeof createPurchaseSchema>;
