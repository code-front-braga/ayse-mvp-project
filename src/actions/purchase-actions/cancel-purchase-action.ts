'use server';

import { PurchaseStatus } from 'generated/prisma';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const cancelPurchaseAction = async (purchaseId: string) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingPurchase = await prisma.purchase.findFirst({
			where: { userId, id: purchaseId },
			include: { products: true },
		});
		if (!existingPurchase) return { error: 'Compra não encontrada.' };

		// Atualizar o status para CANCELLED em vez de excluir
		await prisma.purchase.update({
			where: { id: purchaseId, userId },
			data: { status: PurchaseStatus.CANCELLED },
		});

		revalidatePath(AppRoutes.DASHBOARD_PURCHASES);
		revalidatePath(AppRoutes.DASHBOARD_NEW_PURCHASE);

		return { success: 'Compra cancelada com sucesso!' };
	} catch (error) {
		console.error('Erro ao cancelar compra:', error);
		return { error: 'Erro interno do servidor.' };
	}
};
