'use server';

import { PurchaseStatus } from 'generated/prisma';
import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const registerPurchaseAction = async (purchaseId: string) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const existingPurchase = await prisma.purchase.findFirst({
			where: { userId, id: purchaseId, status: PurchaseStatus.IN_PROCESS },
			include: { products: true },
		});
		if (!existingPurchase) return { error: 'Compra não encontrada.' };

		const total = existingPurchase.products.reduce((acc, product) => {
			return acc + product.price * product.quantity;
		}, 0);

		await prisma.purchase.update({
			where: { id: purchaseId, userId },
			data: {
				status: PurchaseStatus.COMPLETED,
				completedAt: new Date(),
				total,
			},
		});

		return { success: 'Compra registrada com sucesso!' };
	} catch (error) {
		console.error('Erro ao registrar compra:', error);
		return { error: 'Erro interno do servidor.' };
	}
};
