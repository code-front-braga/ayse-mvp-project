'use client';

import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { Purchase } from 'generated/prisma';
import { useCallback, useState } from 'react';

import { deleteProductAction } from '@/actions/product-actions/delete-product-action';
import CustomTableBody from '@/app/dashboard/components/shared/custom-table-body';
import CustomTablePagination from '@/app/dashboard/components/shared/custom-table-pagination';
import { Card } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import useProductColumns from '../../hooks/use-product-columns';
import NewPurchaseSummary from '../new-purchase-summary';
import ProductsTableHeader, { ProductType } from './products-table-header';

interface MainProductTableProps {
	purchase: Purchase;
	products: ProductType[];
}

const MainProductTable = ({ purchase, products }: MainProductTableProps) => {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'name',
			desc: false,
		},
	]);

	const deleteMultipleProducts = useCallback(async (ids: string[]) => {
		try {
			await Promise.all(ids.map(id => deleteProductAction({ id })));
		} catch (error) {
			console.error('Erro ao deletar compras:', error);
		}
	}, []);

	const handleDeleteRows = async () => {
		const selectedRows = table.getSelectedRowModel().rows;
		const selectedIds = selectedRows.map(row => row.original.id!);

		await deleteMultipleProducts(selectedIds);
		table.resetRowSelection();
	};

	const columns = useProductColumns();

	const table = useReactTable({
		data: products,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		enableSortingRemoval: false,
		getPaginationRowModel: getPaginationRowModel(),
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		state: {
			sorting,
			pagination,
			columnFilters,
			columnVisibility,
		},
	});

	return (
		<div className="flex h-full flex-col">
			<NewPurchaseSummary purchase={purchase} products={products} />

			<ProductsTableHeader
				table={table}
				checkboxId="name"
				onDeleteRows={handleDeleteRows}
			/>

			<Card className="bg-border flex flex-1 flex-col shadow-md">
				<div className="flex flex-1 flex-col p-4">
					<div className="flex min-h-0 flex-1 flex-col">
						<div className="flex-1 overflow-auto">
							<Table className="h-full table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
								<TableHeader>
									{table.getHeaderGroups().map(headerGroup => (
										<TableRow
											key={headerGroup.id}
											className="hover:bg-transparent"
										>
											{headerGroup.headers.map(header => (
												<TableHead
													key={header.id}
													style={{ width: `${header.getSize()}px` }}
													className="bg-background border-border text-primary relative h-9 border-y text-xs select-none first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r lg:text-sm"
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
												</TableHead>
											))}
										</TableRow>
									))}
								</TableHeader>
								<tbody aria-hidden="true" className="table-row h-1"></tbody>
								<CustomTableBody
									columns={columns}
									table={table}
									emptyMessage="Não há produtos cadastrados."
								/>
								<tbody aria-hidden="true" className="table-row h-1"></tbody>
							</Table>
						</div>
					</div>

					<div className="mt-4 flex-shrink-0">
						<CustomTablePagination
							pageIndex={pagination.pageIndex}
							pageCount={table.getPageCount()}
							canPreviousPage={table.getCanPreviousPage()}
							canNextPage={table.getCanNextPage()}
							onPrevious={() => table.previousPage()}
							onNext={() => table.nextPage()}
						/>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default MainProductTable;
