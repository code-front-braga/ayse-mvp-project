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
		// ✅ Buscar o produto primeiro para obter o purchaseId
		const productToEdit = await prisma.product.findUnique({
			where: { id: data.id },
			select: { purchaseId: true },
		});

		if (!productToEdit) {
			return { error: 'Produto não encontrado.' };
		}

		// ✅ Buscar a compra específica que contém o produto
		const purchase = await prisma.purchase.findFirst({
			where: {
				id: productToEdit.purchaseId as string,
				userId: session.user.id,
			},
		});

		if (!purchase) {
			return { error: 'Compra não encontrada.' };
		}

		// ✅ Agora podemos atualizar o produto com segurança
		await prisma.product.update({
			where: { id: data.id },
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
