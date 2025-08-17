'use server';

import { PurchaseStatus } from 'generated/prisma';
import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const getCurrentMonthSpending = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return {
		currentMonthTotal: 0,
		previousMonthTotal: 0,
		percentageChange: 0,
		changeType: 'no-comparison' as const,
		hasCurrentMonthPurchases: false,
		hasPreviousMonthPurchases: false,
		currentMonthName: '',
		previousMonthName: '',
		currentMonthPurchasesCount: 0,
	};

	const now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();

	const currentMonthStart = new Date(currentYear, currentMonth, 1);
	const currentMonthEnd = new Date(
		currentYear,
		currentMonth + 1,
		0,
		23,
		59,
		59,
		999,
	);

	const previousMonthStart = new Date(currentYear, currentMonth - 1, 1);
	const previousMonthEnd = new Date(
		currentYear,
		currentMonth,
		0,
		23,
		59,
		59,
		999,
	);

	const [currentMonthPurchases, previousMonthPurchases] = await Promise.all([
		prisma.purchase.findMany({
			where: {
				userId,
				status: PurchaseStatus.COMPLETED,
				completedAt: {
					gte: currentMonthStart,
					lte: currentMonthEnd,
				},
			},
		}),
		prisma.purchase.findMany({
			where: {
				userId,
				status: PurchaseStatus.COMPLETED,
				completedAt: {
					gte: previousMonthStart,
					lte: previousMonthEnd,
				},
			},
		}),
	]);

	const currentMonthTotal = currentMonthPurchases.reduce(
		(acc, purchase) => acc + purchase.total,
		0,
	);

	const previousMonthTotal = previousMonthPurchases.reduce(
		(acc, purchase) => acc + purchase.total,
		0,
	);

	const hasCurrentMonthPurchases = currentMonthPurchases.length > 0;
	const hasPreviousMonthPurchases = previousMonthPurchases.length > 0;

	let percentageChange = 0;
	let changeType: 'increase' | 'decrease' | 'no-change' | 'no-comparison' =
		'no-comparison';

	if (hasCurrentMonthPurchases && hasPreviousMonthPurchases) {
		if (previousMonthTotal > 0) {
			percentageChange =
				((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
			changeType =
				percentageChange > 0
					? 'increase'
					: percentageChange < 0
						? 'decrease'
						: 'no-change';
		}
	}

	const monthNames = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	];

	return {
		currentMonthTotal,
		previousMonthTotal,
		percentageChange: Math.abs(percentageChange),
		changeType,
		hasCurrentMonthPurchases,
		hasPreviousMonthPurchases,
		currentMonthName: monthNames[currentMonth],
		previousMonthName: monthNames[currentMonth - 1] || monthNames[11],
		currentMonthPurchasesCount: currentMonthPurchases.length,
	};
};
