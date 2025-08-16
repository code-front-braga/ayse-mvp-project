'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const permanentDeletePurchaseAction = async (purchaseId: string) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingPurchase = await prisma.purchase.findFirst({
			where: { userId, id: purchaseId },
			include: { products: true },
		});
		if (!existingPurchase) return { error: 'Compra não encontrada.' };

		// Excluir permanentemente a compra
		await prisma.purchase.delete({
			where: { id: purchaseId, userId },
		});

		revalidatePath(AppRoutes.DASHBOARD_PURCHASES);
		revalidatePath(AppRoutes.DASHBOARD_NEW_PURCHASE);

		return { success: 'Compra excluída permanentemente com sucesso!' };
	} catch (error) {
		console.error('Erro ao excluir compra permanentemente:', error);
		return { error: 'Erro interno do servidor.' };
	}
};