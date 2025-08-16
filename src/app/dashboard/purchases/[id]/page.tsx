import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AppRoutes } from '@/enums/app-routes';
import { prisma } from '@/lib/prisma-client';

import DashboardHeader from '../../components/shared/dashboard-header';
import { StatusBadge } from '../../components/shared/status-badge';
import CardActions from './components/card-actions';
import ProductsDetailsHeader from './components/product-details-header';
import PurchaseSummaryDetails from './components/purchase-summary-details';
import MainProductDetailsTable from './components/table/main-product-details-table';

interface PurchaseDetailsProps {
	params: { id: string };
}

const PurchaseDetails = async ({ params }: PurchaseDetailsProps) => {
	const { id } = params;

	const purchase = await prisma.purchase.findFirst({
		where: { id },
		include: {
			products: true,
		},
	});

	if (!purchase) return notFound();

	return (
		<div className="container mx-auto space-y-6">
			<DashboardHeader
				title="Detalhes da Compra"
				description="Aqui você pode visualizar os detalhes da compra."
			/>

			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-between">
					<Link
						href={AppRoutes.DASHBOARD_PURCHASES}
						className="text-primary flex items-center gap-1 text-sm hover:underline hover:underline-offset-2"
					>
						<ArrowLeft size={16} />
						Voltar
					</Link>
					<StatusBadge status={purchase.status} />
				</div>

				<Card>
					<CardHeader>
						<ProductsDetailsHeader purchase={purchase} />
					</CardHeader>
					<CardContent>
						<div className="flex flex-col space-y-4">
							<div className="rounded-md border">
								<div className="max-h-[400px] overflow-y-auto">
									<MainProductDetailsTable purchase={purchase} />
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="flex w-full flex-col items-center gap-4 md:h-60 md:flex-row md:justify-between">
					<PurchaseSummaryDetails purchase={purchase} />
					<CardActions purchase={purchase} />
				</div>
			</div>
		</div>
	);
};

export default PurchaseDetails;
