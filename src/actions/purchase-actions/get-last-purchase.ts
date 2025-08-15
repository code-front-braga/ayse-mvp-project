'use server';

import { PurchaseStatus } from 'generated/prisma';
import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const getLastPurchase = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) throw new Error('Usuário não autenticado.');

	const lastPurchase = await prisma.purchase.findFirst({
		where: { userId, status: PurchaseStatus.COMPLETED },
		orderBy: { completedAt: 'desc' },
		take: 1,
	});
	return lastPurchase;
};
