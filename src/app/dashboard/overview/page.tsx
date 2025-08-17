import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { hasPurchases } from '@/actions/purchase-actions/has-purchases-action';
import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import DashboardHeader from '../components/shared/dashboard-header';
import Cards from './components/cards';
import CardsSkeleton from './components/cards-skeleton';
import MainCharts from './components/charts/main-charts';
import EmptyState from './components/empty-state';
import OverviewMainTable from './components/table/overview-main-table';

export const metadata: Metadata = {
	title: 'Visão Geral',
	description: 'Visão geral do dashboard',
};

const OverviewPage = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) redirect(AppRoutes.SIGN_IN);
  
	const hasUserPurchases = await hasPurchases();

	const purchases = await prisma.purchase.findMany({
		where: { userId },
		include: {
			products: true,
		},
		orderBy: { completedAt: 'desc' },
	});

	return (
		<>
			<DashboardHeader
				title="Visão Geral"
				description="Suas últimas atividades no sistema"
			/>
			{!hasUserPurchases ? (
				<EmptyState />
			) : (
				<Suspense fallback={<CardsSkeleton />}>
					<Cards />
				</Suspense>
			)}
			<div className="grid grid-cols-1 gap-4">
				<MainCharts />
				<OverviewMainTable purchases={purchases} />
			</div>
		</>
	);
};

export default OverviewPage;
