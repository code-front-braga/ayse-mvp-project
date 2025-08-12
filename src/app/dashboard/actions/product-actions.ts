'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/client';

import { AddProductSchema } from '../new-purchase/[id]/schemas/product-schema';
import { updatePurchaseTotalAction } from './purchase-actions';

export const addProductAction = async (data: AddProductSchema & { purchaseId: string }) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não encontrado.' };

	const purchase = await prisma.purchase.findFirst({
		where: { 
			id: data.purchaseId,
			userId 
		},
		include: { products: true },
	});

	if (!purchase) return { error: 'Compra não encontrada.' };

	const existingProduct = await prisma.product.findFirst({
		where: { name: data.name, purchaseId: purchase.id },
	});

	if (existingProduct) {
		return { error: 'Produto já existe na compra.' };
	}

	const product = await prisma.product.create({
		data: {
			purchaseId: purchase.id,
			name: data.name,
			category: data.category,
			price: data.price,
			quantity: data.quantity,
			description: data.description,
			total: data.price * data.quantity,
		},
	});

	// Recalcular e atualizar o total da compra
	await updatePurchaseTotalAction(purchase.id);

	return {
		success: 'Produto adicionado com sucesso!',
		product,
	};
};
