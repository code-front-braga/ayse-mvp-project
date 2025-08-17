'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

const recalculatePurchaseTotalAction = async (purchaseId: string) => {
	// Obter o userId da sessão autenticada
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;

	// Verificar se o usuário está autenticado
	if (!userId) {
		throw new Error('Usuário não autenticado');
	}

	// Verificar se a compra pertence ao usuário autenticado
	const purchase = await prisma.purchase.findFirst({
		where: { id: purchaseId, userId },
	});

	if (!purchase) {
		throw new Error('Compra não encontrada ou não pertence ao usuário');
	}

	// Buscar os produtos da compra
	const products = await prisma.product.findMany({
		where: { purchaseId },
		select: { price: true, quantity: true },
	});

	// Calcular o total
	const total = products.reduce((sum, product) => {
		return sum + product.price * product.quantity;
	}, 0);

	// Atualizar o total da compra
	await prisma.purchase.update({
		where: { id: purchaseId, userId }, // Adicionar userId para garantir que só atualiza compras do usuário
		data: { total },
	});

	return total;
};

export default recalculatePurchaseTotalAction;
