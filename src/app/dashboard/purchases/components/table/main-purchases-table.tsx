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
import { useCallback, useState } from 'react';

import { deletePurchaseAction } from '@/actions/purchase-actions/delete-purchase-action';
import CustomTableBody from '@/app/dashboard/components/shared/custom-table-body';
import CustomTablePagination from '@/app/dashboard/components/shared/custom-table-pagination';
import { PurchaseType } from '@/app/dashboard/overview/components/table/supermarket-columns';
import { Card } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import usePurchaseColumns from '../../hooks/use-purchase-columns';
import PurchaseTableHeader from './purchase-table-header';

const MainPurchasesTable = ({ purchases }: { purchases: PurchaseType[] }) => {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [sorting, setSorting] = useState<SortingState>([
		{
			id: 'supermarket',
			desc: false,
		},
	]);

	const deleteMultiplePurchases = useCallback(async (ids: string[]) => {
		try {
			await Promise.all(ids.map(id => deletePurchaseAction(id)));
		} catch (error) {
			console.error('Erro ao deletar compras:', error);
		}
	}, []);

	const handleDeleteRows = async () => {
		const selectedRows = table.getSelectedRowModel().rows;
		const selectedIds = selectedRows.map(row => row.original.id);

		await deleteMultiplePurchases(selectedIds);
		table.resetRowSelection();
	};

	const columns = usePurchaseColumns();

	const table = useReactTable({
		data: purchases,
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
			<PurchaseTableHeader
				table={table}
				onDeleteRows={handleDeleteRows}
				checkboxId="purchase-checkbox"
			/>

			<Card className="bg-sidebar flex flex-1 flex-col shadow-md">
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
									emptyMessage="Não há compras cadastradas."
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

export default MainPurchasesTable;
