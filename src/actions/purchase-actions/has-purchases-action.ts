import { prisma } from '@/lib/prisma-client';

export const hasPurchases = async (): Promise<boolean> => {
	const purchaseCount = await prisma.purchase.count({
		take: 1,
	});

	return purchaseCount > 0;
};
