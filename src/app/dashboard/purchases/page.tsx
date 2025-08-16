import { Metadata } from 'next';

import { prisma } from '@/lib/prisma-client';

import DashboardHeader from '../components/shared/dashboard-header';
import MainPurchasesTable from './components/table/main-purchases-table';

export const metadata: Metadata = {
	title: 'Minhas Compras',
	description: 'Aqui você pode visualizar e gerenciar suas compras.',
};

const PurchasesPage = async () => {
	const purchases = await prisma.purchase.findMany();

	return (
		<>
			<DashboardHeader
				title="Minhas Compras"
				description="Aqui você pode visualizar e gerenciar suas compras."
			/>

			<div className="min-h-0 flex-1">
				<MainPurchasesTable purchases={purchases} />
			</div>
		</>
	);
};

export default PurchasesPage;
