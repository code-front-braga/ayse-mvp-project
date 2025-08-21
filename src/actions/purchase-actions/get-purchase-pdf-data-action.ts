'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const getPurchasePdfDataAction = async (purchaseId: string) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não autenticado.' };

	try {
		const purchase = await prisma.purchase.findFirst({
			where: { id: purchaseId, userId },
			include: {
				products: {
					orderBy: { name: 'asc' },
				},
			},
		});

		if (!purchase) {
			return { error: 'Compra não encontrada.' };
		}

		const totalQuantityItems = purchase.products.reduce(
			(acc, product) => acc + product.quantity,
			0,
		);

		const totalProducts = purchase.products.length;

		return {
			success: true,
			data: {
				id: purchase.id,
				supermarket: purchase.supermarket,
				address: purchase.address,
				date: purchase.date,
				total: purchase.total,
				status: purchase.status,
				totalProducts,
				totalQuantityItems,
				products: purchase.products.map(product => ({
					id: product.id,
					name: product.name,
					category: product.category,
					price: product.price,
					quantity: product.quantity,
					total: product.total,
					description: product.description,
				})),
			},
		};
	} catch (error) {
		console.error('Erro ao buscar dados da compra para PDF:', error);
		return { error: 'Erro interno do servidor.' };
	}
};