'use server';

import { PurchaseStatus } from 'generated/prisma';
import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const mostVisitedSupermarket = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return {
		name: '',
		totalSpent: 0,
		visitCount: 0,
	};

	const mostVisitedSupermarket = await prisma.purchase.groupBy({
		where: {
			userId,
			status: PurchaseStatus.COMPLETED
		},
		by: ['supermarket'],
		_count: { supermarket: true },
		_sum: { total: true },
		orderBy: { _count: { supermarket: 'desc' } },
		take: 1,
	});

	return {
		name: mostVisitedSupermarket[0]?.supermarket,
		totalSpent: mostVisitedSupermarket[0]?._sum.total || 0,
		visitCount: mostVisitedSupermarket[0]?._count.supermarket,
	};
};
