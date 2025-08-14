'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import recalculatePurchaseTotalAction from '../purchase-actions/recalculate-purchase-total-action';
import { DeleteProductSchema } from './product-schema';

export const deleteProductAction = async (data: DeleteProductSchema) => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user?.id) {
		return { error: 'Usuário não autenticado.' };
	}

	try {
		const productToDelete = await prisma.product.findFirst({
			where: { id: data.id },
			select: { purchaseId: true },
		});

		if (!productToDelete) {
			return { error: 'Produto não encontrado.' };
		}

		const purchase = await prisma.purchase.findFirst({
			where: {
				id: productToDelete.purchaseId as string,
				userId: session.user.id,
			},
		});

		if (!purchase) {
			return { error: 'Compra não encontrada.' };
		}

		await prisma.product.delete({
			where: { id: data.id },
		});

		await recalculatePurchaseTotalAction(purchase?.id);

		revalidatePath(`${AppRoutes.DASHBOARD_NEW_PURCHASE}/${purchase?.id}`);

		return { success: 'Produto deletado com sucesso!' };
	} catch (error) {
		console.error('Erro ao remover produto:', error);
		return { error: 'Erro interno do servidor.' };
	}
};
