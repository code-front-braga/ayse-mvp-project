import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/client';

import NewPurchaseHeader from './components/new-purchase-header';
import { PurchaseSummary } from './components/purchase-summary';

interface NewPurchasePageProps {
	params: Promise<{ id: string }>;
}

export default async function NewPurchasePage({
	params,
}: NewPurchasePageProps) {
	const { id } = await params;

	const purchase = await prisma.purchase.findUnique({
		where: { id },
		include: {
			products: true,
		},
	});

	if (!purchase) {
		return <div>Compra não encontrada</div>;
	}

	return (
		<div className="space-y-6">
			<NewPurchaseHeader purchase={purchase} />
			<Separator />
			<PurchaseSummary purchase={purchase} />
		</div>
	);
}
