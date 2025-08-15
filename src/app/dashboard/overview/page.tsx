import type { Metadata } from 'next';
import { Suspense } from 'react';

import { hasPurchases } from '@/actions/purchase-actions/has-purchases-action';

import DashboardHeader from '../components/shared/dashboard-header';
import Cards from './components/cards';
import CardsSkeleton from './components/cards-skeleton';
import EmptyState from './components/empty-state';

export const metadata: Metadata = {
	title: 'Visão Geral',
	description: 'Visão geral do dashboard',
};

const OverviewPage = async () => {
	const hasUserPurchases = await hasPurchases();

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
		</>
	);
};

export default OverviewPage;
