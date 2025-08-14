import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

import { Separator } from '@/components/ui/separator';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import NewPurchaseHeader from './components/new-purchase-header';
import MainProductTable from './components/table/main-product-table';

interface NewPurchasePageProps {
	params: Promise<{ id: string }>;
}

const NewPurchasePage = async ({ params }: NewPurchasePageProps) => {
	const { id: purchaseId } = await params;
	if (!purchaseId) return { error: 'ID da compra não encontrado.' };

	const session = await auth.api.getSession({ headers: await headers() });
	if (!session) return { error: 'Sessão inválida.' };

	const purchase = await prisma.purchase.findFirst({
		where: { id: purchaseId, userId: session.user.id },
		include: { products: true },
	});

	if (!purchase) notFound();

	return (
		<div className="flex flex-col gap-4 md:gap-6 md:py-0">
			<NewPurchaseHeader purchase={purchase} />
			<Separator />
			<div className="grid grid-cols-1 gap-4">
				<MainProductTable purchase={purchase} products={purchase.products} />
			</div>
		</div>
	);
};

export default NewPurchasePage;
