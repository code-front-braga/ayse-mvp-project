import { Prisma } from 'generated/prisma';

import { stringUtils } from '@/helpers/string-utils';

import AlertDialogRegisterPurchase from './alert-dialog-register-purchase';
import SheetDrawerAddProduct from './sheet-drawer-add-product';
import { ProductType } from './table/products-table-header';

interface NewPurchaseSummaryProps {
	purchase: Prisma.PurchaseGetPayload<{ include: { products: true } }>;
	products: ProductType[];
}

const NewPurchaseSummary = ({
	purchase,
	products,
}: NewPurchaseSummaryProps) => {
	const formattedTotal = stringUtils.formatToCurrencyBRL(purchase.total);

	return (
		<>
			<div className="bg-sidebar mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed p-4">
				<div className="flex w-full flex-row items-center justify-between gap-6 md:w-fit">
					<div className="flex w-full flex-col items-start justify-center rounded-md md:w-fit md:rounded-none md:border-0 md:shadow-none">
						<p className="text-muted-foreground text-xs md:text-sm">Total:</p>

						<span className="text-primary text-sm font-semibold md:text-base">
							{formattedTotal || 'R$ 0,00'}
						</span>
					</div>

					<div className="flex w-full flex-col items-end justify-center rounded-md md:w-fit md:items-start md:rounded-none md:border-0 md:shadow-none">
						<p className="text-muted-foreground text-xs md:text-sm">
							{products.length === 1 ? 'Produto' : 'Produtos'}
						</p>
						<span className="text-primary text-sm font-semibold md:text-base">
							{stringUtils.padWithZero(products.length)}
						</span>
					</div>
				</div>

				<div className="flex w-full flex-col items-center gap-3 md:w-fit md:flex-row">
					<SheetDrawerAddProduct />
					<AlertDialogRegisterPurchase
						purchase={purchase}
						products={products}
					/>
				</div>
			</div>
		</>
	);
};

export default NewPurchaseSummary;
