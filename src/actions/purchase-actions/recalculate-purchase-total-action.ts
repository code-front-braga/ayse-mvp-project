'use server';

import { prisma } from '@/lib/prisma-client';

const recalculatePurchaseTotalAction = async (purchaseId: string) => {
	const products = await prisma.product.findMany({
		where: { purchaseId },
		select: { price: true, quantity: true },
	});

	const total = products.reduce((sum, product) => {
		return sum + product.price * product.quantity;
	}, 0);

	await prisma.purchase.update({
		where: { id: purchaseId },
		data: { total },
	});

	return total;
};

export default recalculatePurchaseTotalAction;
