import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { Separator } from '@/components/ui/separator';
import { ProductType } from '@/hooks/use-optimistic-products';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import NewPurchaseHeader from './components/new-purchase-header';
import MainProductTable from './components/table/main-product-table';
import ProductTableSkeleton from './components/table/product-table-skeleton';
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
		include: { products: { orderBy: { createdAt: 'desc' } } },
	});

	if (!purchase) notFound();

	return (
		<div className="flex flex-col gap-4 md:gap-6 md:py-0">
			<NewPurchaseHeader purchase={purchase} />
			<Separator />
			<div className="grid grid-cols-1 gap-4">
				<Suspense fallback={<ProductTableSkeleton />}>
					<MainProductTable
						purchase={purchase}
						products={purchase.products as ProductType[]}
					/>
				</Suspense>
			</div>
		</div>
	);
};

export default NewPurchasePage;
