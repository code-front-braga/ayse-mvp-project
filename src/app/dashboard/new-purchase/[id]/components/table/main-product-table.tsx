'use client';

import { Table as TanstackTable } from '@tanstack/react-table';
import { Prisma } from 'generated/prisma';
import { startTransition, useCallback } from 'react';

import { deleteProductAction } from '@/actions/product-actions/delete-product-action';
import GenericDataTable from '@/app/dashboard/components/shared/generic-data-table';
import {
	OptimisticProvider,
	ProductType,
	useOptimisticProducts,
} from '@/hooks/use-optimistic-products';

import useProductColumns from '../../hooks/use-product-columns';
import NewPurchaseSummary from '../new-purchase-summary';
import ProductsTableHeader from './products-table-header';

interface MainProductTableProps {
	purchase: Prisma.PurchaseGetPayload<{ include: { products: true } }>;
	products: ProductType[];
}

const ProductTableContent = ({ purchase }: MainProductTableProps) => {
	const { optimisticProducts, addOptimisticProduct } = useOptimisticProducts();

	const deleteMultipleProducts = useCallback(
		async (ids: string[]) => {
			startTransition(async () => {
				try {
					addOptimisticProduct({ type: 'delete_multiple', productIds: ids });
					await Promise.all(ids.map(id => deleteProductAction({ id })));
				} catch (error) {
					console.error('Erro ao deletar produtos:', error);
				}
			});
		},
		[addOptimisticProduct],
	);

	const columns = useProductColumns();

	const handleDeleteRows = async (table: TanstackTable<ProductType>) => {
		const selectedRows = table.getSelectedRowModel().rows;
		const selectedIds = selectedRows.map(row => row.original.id!);

		await deleteMultipleProducts(selectedIds);
		table.resetRowSelection();
	};

	return (
		<GenericDataTable
			data={optimisticProducts}
			columns={columns}
			emptyMessage="Não há produtos cadastrados."
			headerComponent={table => (
				<>
					<NewPurchaseSummary purchase={purchase} />
					<ProductsTableHeader
						table={table}
						checkboxId="name"
						onDeleteRows={() => handleDeleteRows(table)}
					/>
				</>
			)}
		/>
	);
};

const MainProductTable = ({ purchase, products }: MainProductTableProps) => {
	return (
		<OptimisticProvider initialProducts={products}>
			<ProductTableContent purchase={purchase} products={products} />
		</OptimisticProvider>
	);
};

export default MainProductTable;
