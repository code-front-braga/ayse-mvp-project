'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { stringUtils } from '@/helpers/string-utils';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import recalculatePurchaseTotalAction from '../purchase-actions/recalculate-purchase-total-action';
import { ProductSchema } from './product-schema';

interface AddProductActionProps extends ProductSchema {
	purchaseId: string;
}

export const addProductAction = async (data: AddProductActionProps) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const purchase = await prisma.purchase.findFirst({
			where: { id: data.purchaseId, userId },
		});
		if (!purchase) return { error: 'Compra não encontrada.' };

		const product = await prisma.product.findFirst({
			where: { purchaseId: data.purchaseId, name: data.name },
		});
		if (product) return { error: 'Produto já existe na compra.' };

		const total = stringUtils.multiply(data.price, data.quantity);

		await prisma.product.create({
			data: {
				name: data.name,
				price: data.price,
				quantity: data.quantity,
				category: data.category,
				total: total,
				purchaseId: purchase.id,
			},
		});

		await recalculatePurchaseTotalAction(purchase.id);

		revalidatePath(`${AppRoutes.DASHBOARD_NEW_PURCHASE}/${purchase.id}`);

		return { success: 'Produto adicionado com sucesso!' };
	} catch (error) {
		return { error: `Erro ao adicionar produto: ${error}` };
	}
};
