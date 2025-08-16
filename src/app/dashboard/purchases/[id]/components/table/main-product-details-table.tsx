'use client';

import { Prisma } from 'generated/prisma';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { COLORS } from '@/enums/colors';
import { stringUtils } from '@/helpers/string-utils';

import ProductDescriptionDialog from '../product-description-dialog';

interface MainProductDetailsTableProps {
	purchase: Prisma.PurchaseGetPayload<{
		select: {
			products: {
				select: {
					id: true;
					name: true;
					category: true;
					price: true;
					quantity: true;
					total: true;
					description: true;
				};
			};
		};
	}>;
}

const MainProductDetailsTable = ({
	purchase,
}: MainProductDetailsTableProps) => {
	const [selectedProduct, setSelectedProduct] = useState<{
		name: string;
		description: string | null;
	} | null>(null);

	const handleViewDescription = (name: string, description: string | null) => {
		setSelectedProduct({ name, description });
	};

	return (
		<>
			<Table>
				<TableHeader className="text-xs lg:text-sm">
					<TableRow>
						<TableHead>Produto</TableHead>
						<TableHead>Qtd</TableHead>
						<TableHead>Categoria</TableHead>
						<TableHead>Preço Unit.</TableHead>
						<TableHead className="text-right">Total</TableHead>
						<TableHead className="text-right">Ações</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{purchase.products.map(product => (
						<TableRow key={product.id}>
							<TableCell className="w-40 truncate text-xs lg:text-sm">
								{product.name}
							</TableCell>
							<TableCell>{stringUtils.padWithZero(product.quantity)}</TableCell>
							<TableCell className="w-60 truncate text-xs lg:text-sm">
								{stringUtils.toTitleCase(product.category)}
							</TableCell>
							<TableCell className="w-30 truncate text-xs lg:text-sm">
								{stringUtils.formatToCurrencyBRL(product.price)}
							</TableCell>
							<TableCell className="truncate text-right text-xs lg:text-sm">
								{stringUtils.formatToCurrencyBRL(product.total)}
							</TableCell>
							<TableCell className="text-right">
								<Button
									size="icon"
									variant="ghost"
									onClick={() =>
										handleViewDescription(product.name, product.description)
									}
									aria-label="Ver descrição"
								>
									<Ellipsis color={COLORS.PRIMARY} className="h-4 w-4" />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{selectedProduct && (
				<ProductDescriptionDialog
					open={!!selectedProduct}
					onOpenChange={open => !open && setSelectedProduct(null)}
					productName={selectedProduct.name}
					description={selectedProduct.description}
				/>
			)}
		</>
	);
};

export default MainProductDetailsTable;
