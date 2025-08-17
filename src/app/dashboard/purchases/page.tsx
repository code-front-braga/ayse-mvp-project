import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import DashboardHeader from '../components/shared/dashboard-header';
import MainPurchasesTable from './components/table/main-purchases-table';

export const metadata: Metadata = {
	title: 'Minhas Compras',
	description: 'Aqui você pode visualizar e gerenciar suas compras.',
};

const PurchasesPage = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) redirect(AppRoutes.SIGN_IN);

	const purchases = await prisma.purchase.findMany({
		where: { userId },
	});

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
