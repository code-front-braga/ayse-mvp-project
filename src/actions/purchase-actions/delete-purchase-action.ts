'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const deletePurchaseAction = async (purchaseId: string) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingPurchase = await prisma.purchase.findFirst({
			where: { userId, id: purchaseId },
			include: { products: true },
		});
		if (!existingPurchase) return { error: 'Compra não encontrada.' };

		await prisma.purchase.delete({
			where: { id: purchaseId, userId },
		});

		revalidatePath(AppRoutes.DASHBOARD_PURCHASES);
		revalidatePath(AppRoutes.DASHBOARD_NEW_PURCHASE);

		return { success: 'Compra deletada com sucesso!' };
	} catch (error) {
		console.error('Erro ao deletar compra:', error);
		return { error: 'Erro interno do servidor.' };
	}
};
