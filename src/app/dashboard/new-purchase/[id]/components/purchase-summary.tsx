import { Prisma } from 'generated/prisma';
import { PackageCheck, Plus, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { stringUtils } from '@/helpers/string-utils';

interface PurchaseSummaryProps {
	purchase: Prisma.PurchaseGetPayload<{
		select: { total: true };
		include: { products: true };
	}>;
}

export function PurchaseSummary({ purchase }: PurchaseSummaryProps) {
	const totalValue = purchase.products.reduce(
		(sum, product) => sum + product.price,
		0,
	);
	const itemsCount = purchase.products.length;

	return (
		<div className="bg-sidebar flex flex-col items-center rounded p-4 md:flex-row md:justify-between">
			{/* Left Side */}
			<div className="flex w-full justify-between gap-2 self-start md:h-12 md:flex-row md:justify-start md:gap-4">
				<div className="flex flex-col items-start md:gap-1">
					<p className="text-muted-foreground text-sm">Valor Total</p>
					<span className="text-base font-semibold text-gray-800 md:text-xl">
						{stringUtils.formatCurrency(totalValue)}
					</span>
				</div>
				<Separator
					orientation="vertical"
					className="md:bg-primary hidden md:block"
				/>
				<div className="flex flex-col items-end md:items-start md:gap-1">
					<p className="text-muted-foreground text-sm">
						{itemsCount === 1 ? 'Produtos' : 'Produto'}
					</p>
					<span className="text-base font-semibold text-gray-800 md:text-xl">
						{stringUtils.padWithZero(itemsCount)}
					</span>
				</div>
			</div>

			{/* Right Side */}
			<div className="mt-4 flex w-full flex-col gap-2 md:mt-0 md:w-auto md:flex-row">
				<Button variant="outline" className="w-full md:w-auto">
					<Plus />
					Adicionar Produto
				</Button>
				<Button className="w-full bg-emerald-500 hover:bg-emerald-400 md:w-auto">
					<PackageCheck />
					Finalizar Compra
				</Button>
				<Button variant="destructive" className="w-full md:w-auto">
					<X />
					Cancelar Compra
				</Button>
			</div>
		</div>
	);
}
