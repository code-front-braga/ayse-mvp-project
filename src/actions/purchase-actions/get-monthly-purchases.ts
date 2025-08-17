'use server';

import { PurchaseStatus } from 'generated/prisma';
import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export interface MonthlyPurchaseData {
	month: string;
	total: number;
}

export async function getMonthlyPurchases(): Promise<MonthlyPurchaseData[]> {
	// Obter o userId da sessão autenticada
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;

	// Se não houver usuário autenticado, retornar dados vazios
	if (!userId) {
		const currentDate = new Date();
		return [{
			month: currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
			total: 0
		}];
	}

	// Buscar a data da primeira compra do usuário
	const firstPurchase = await prisma.purchase.findFirst({
		where: {
			userId, // Adicionar filtro por userId
			status: {
				not: PurchaseStatus.CANCELLED
			}
		},
		orderBy: {
			date: 'asc',
		},
		select: {
			date: true,
		},
	});

	const currentDate = new Date();
	// Se não houver compras, retornar apenas o mês atual
	if (!firstPurchase) {
		return [{
			month: currentDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }),
			total: 0
		}];
	}

	// Calcular quantos meses se passaram desde a primeira compra
	const firstPurchaseDate = new Date(firstPurchase.date);
	const monthsDiff = (
		(currentDate.getFullYear() - firstPurchaseDate.getFullYear()) * 12 +
		currentDate.getMonth() - firstPurchaseDate.getMonth()
	);

	// Limitar a no máximo 5 meses, mas mostrar pelo menos o número de meses desde a primeira compra
	const monthsToShow = Math.min(Math.max(monthsDiff + 1, 1), 5);

	const startDate = new Date();
	startDate.setMonth(currentDate.getMonth() - (monthsToShow - 1));
	startDate.setDate(1);
	startDate.setHours(0, 0, 0, 0);

	const purchases = await prisma.purchase.findMany({
		where: {
			userId, // Adicionar filtro por userId
			date: {
				gte: startDate,
			},
			status: {
				not: PurchaseStatus.CANCELLED
			}
		},
		select: {
			date: true,
			total: true,
		},
		orderBy: {
			date: 'asc',
		},
	});

	// Agrupar compras por mês
	const monthlyData: Record<string, number> = {};

	// Inicializar os meses a serem mostrados com zero
	for (let i = 0; i < monthsToShow; i++) {
		const monthDate = new Date();
		monthDate.setMonth(currentDate.getMonth() - i);
		const monthKey = monthDate.toLocaleString('pt-BR', {
			month: 'long',
			year: 'numeric',
		});
		monthlyData[monthKey] = 0;
	}

	// Somar os totais de cada mês
	purchases.forEach(purchase => {
		const monthKey = purchase.date.toLocaleString('pt-BR', {
			month: 'long',
			year: 'numeric',
		});
		monthlyData[monthKey] = (monthlyData[monthKey] || 0) + purchase.total;
	});

	// Converter para o formato esperado pelo gráfico
	const result = Object.entries(monthlyData).map(([month, total]) => ({
		month,
		total,
	}));

	// Ordenar os meses do mais antigo para o mais recente
	const monthOrder: Record<string, number> = {};
	for (let i = 0; i < monthsToShow; i++) {
		const monthDate = new Date();
		monthDate.setMonth(currentDate.getMonth() - i);
		const monthKey = monthDate.toLocaleString('pt-BR', {
			month: 'long',
			year: 'numeric',
		});
		monthOrder[monthKey] = monthsToShow - i; // Valor maior para meses mais recentes
	}

	return result.sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);
}
