'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import recalculatePurchaseTotalAction from '../purchase-actions/recalculate-purchase-total-action';
import { ProductSchema } from './product-schema';

export interface EditProductActionProps extends ProductSchema {
	id: string;
}

export const editProductAction = async (data: EditProductActionProps) => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user?.id) {
		return { error: 'Usuário não autenticado.' };
	}

	try {
		const purchase = await prisma.purchase.findFirst({
			where: { userId: session.user.id },
		});
		if (!purchase) {
			return { error: 'Compra não encontrada.' };
		}

		const product = await prisma.product.findFirst({
			where: { id: data.id, purchaseId: purchase?.id },
		});
		if (!product) {
			return { error: 'Produto não encontrado.' };
		}

		await prisma.product.update({
			where: { id: product.id },
			data: {
				name: data.name,
				category: data.category,
				price: data.price,
				quantity: data.quantity,
				description: data.description,
			},
		});

		await recalculatePurchaseTotalAction(purchase?.id);

		revalidatePath(`${AppRoutes.DASHBOARD_NEW_PURCHASE}/${purchase?.id}`);

		return { success: 'Produto atualizado com sucesso!' };
	} catch (error) {
		console.error('Erro ao atualizar produto:', error);
		return { error: 'Erro ao atualizar produto.' };
	}
};
