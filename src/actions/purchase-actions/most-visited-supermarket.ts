'use server';

import { PurchaseStatus } from 'generated/prisma';

import { prisma } from '@/lib/prisma-client';

export const mostVisitedSupermarket = async () => {
	const mostVisitedSupermarket = await prisma.purchase.groupBy({
		where: { status: PurchaseStatus.COMPLETED },
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
