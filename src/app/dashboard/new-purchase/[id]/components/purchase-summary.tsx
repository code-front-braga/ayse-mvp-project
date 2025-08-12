'use client';

import { Prisma } from 'generated/prisma';
import { PackageCheck, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { stringUtils } from '@/helpers/string-utils';

import DrawerSheetAddProductForm from './drawer-sheet-add-product-form';

interface PurchaseSummaryProps {
	purchase: Prisma.PurchaseGetPayload<{
		select: { total: true };
		include: { products: true };
	}>;
}

export function PurchaseSummary({ purchase }: PurchaseSummaryProps) {
	const { setOpenMobile } = useSidebar();

	const totalValue = purchase.total;
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
				<DrawerSheetAddProductForm setIsSidebarOpen={setOpenMobile} />
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
