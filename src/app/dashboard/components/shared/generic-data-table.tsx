'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	Table as TanstackTable,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { ReactNode, useState } from 'react';

import { Card } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import CustomTableBody from './custom-table-body';
import CustomTablePagination from './custom-table-pagination';

interface GenericDataTableProps<TData> {
	data: TData[];
	columns: ColumnDef<TData>[];
	emptyMessage: string;
	headerComponent?: ReactNode | ((table: TanstackTable<TData>) => ReactNode);
	initialSorting?: SortingState;
	pageSize?: number;
	getRowId?: (row: TData) => string;
}

const GenericDataTable = <TData,>({
	data,
	columns,
	emptyMessage,
	headerComponent,
	initialSorting = [],
	pageSize = 10,
	getRowId,
}: GenericDataTableProps<TData>) => {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [sorting, setSorting] = useState<SortingState>(initialSorting);

	const table = useReactTable({
		data,
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
		...(getRowId ? { getRowId } : {}),
	});

	return (
		<div className="flex h-full flex-col">
			{typeof headerComponent === 'function'
				? headerComponent(table)
				: headerComponent}

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
									emptyMessage={emptyMessage}
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

export default GenericDataTable;
