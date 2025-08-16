import { Separator } from '@radix-ui/react-separator';
import { Prisma } from 'generated/prisma';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { stringUtils } from '@/helpers/string-utils';

interface PurchaseSummaryDetailsProps {
	purchase: Prisma.PurchaseGetPayload<{
		select: {
			products: true;
			total: true;
			date: true;
		};
	}>;
}

const PurchaseSummaryDetails = ({ purchase }: PurchaseSummaryDetailsProps) => {
	const totalItems = purchase.products.reduce(
		(acc, product) => acc + product.quantity,
		0,
	);

	return (
		<Card className="h-full w-full flex-1">
			<CardHeader>
				<CardTitle>Resumo da Compra</CardTitle>
			</CardHeader>
			<CardContent className="truncate text-xs lg:text-sm">
				<div className="space-y-2">
					<div className="flex justify-between">
						<span className="text-muted-foreground">Tipos de produtos:</span>
						<span>{purchase.products.length}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Quantidade total:</span>
						<span>{totalItems}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-muted-foreground">Data da compra:</span>
						<span className="text-end">
							{stringUtils.formatDateToBRL(purchase.date)}
						</span>
					</div>

					<Separator />

					<div className="flex justify-between pt-4 font-medium">
						<span>Valor Total:</span>
						<span className="text-primary text-sm font-semibold md:text-lg">
							{stringUtils.formatToCurrencyBRL(purchase.total) || 'R$ 0,00'}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PurchaseSummaryDetails;
