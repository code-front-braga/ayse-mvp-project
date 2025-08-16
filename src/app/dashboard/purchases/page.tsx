import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import DashboardHeader from '../components/shared/dashboard-header';
import MainPurchasesTable from './components/table/main-purchases-table';

export const metadata: Metadata = {
	title: 'Minhas Compras',
	description: 'Aqui você pode visualizar e gerenciar suas compras.',
};

interface PurchasesPageProps {
	searchParams: Promise<{ details?: string }>;
}

const PurchasesPage = async ({ searchParams }: PurchasesPageProps) => {
	const { details } = await searchParams;

	// Se tiver o parâmetro details, redireciona para a página de detalhes
	if (details) {
		return redirect(`/dashboard/purchases/${details}`);
	}

	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;

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
