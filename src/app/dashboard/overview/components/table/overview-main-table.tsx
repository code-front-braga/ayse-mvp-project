'use client';

import {
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { Prisma } from 'generated/prisma';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import CustomTableBody from '@/app/dashboard/components/shared/custom-table-body';
import CustomTablePagination from '@/app/dashboard/components/shared/custom-table-pagination';
import { Card, CardHeader } from '@/components/ui/card';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AppRoutes } from '@/enums/app-routes';

import columnsDef, { PurchaseType } from './supermarket-columns';

interface OverviewMainTableProps {
	purchases: Prisma.PurchaseGetPayload<{ include: { products: true } }>[];
}

const OverviewMainTable = ({ purchases }: OverviewMainTableProps) => {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

	const columns = useMemo(() => columnsDef, []);

	const table = useReactTable({
		data: purchases as PurchaseType[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: { pagination },
		onPaginationChange: setPagination,
	});

	return (
		<Card className="bg-sidebar flex flex-col justify-between p-4 shadow-md">
			<CardHeader
				className={`mb-2 ${purchases.length === 0 ? 'opacity-50' : 'hidden lg:grid lg:gap-2 lg:p-0'}`}
			>
				<p className="text-xs">Para mais detalhes, acesse:</p>
				<Link
					href={AppRoutes.DASHBOARD_PURCHASES}
					className="bg-primary text-background w-fit rounded p-1.5 text-sm shadow-xl"
					aria-disabled={purchases.length === 0}
					tabIndex={purchases.length === 0 ? -1 : 0}
				>
					Histórico
				</Link>
			</CardHeader>
			<div className="flex flex-col gap-4">
				<Table
					className="table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b"
					aria-label="Tabela de compras"
				>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id} className="hover:bg-transparent">
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
						emptyMessage="Não há compras no momento."
					/>
					<tbody aria-hidden="true" className="table-row h-1"></tbody>
				</Table>
			</div>
			<CustomTablePagination
				pageIndex={pagination.pageIndex}
				pageCount={table.getPageCount()}
				canPreviousPage={table.getCanPreviousPage()}
				canNextPage={table.getCanNextPage()}
				onPrevious={() => table.previousPage()}
				onNext={() => table.nextPage()}
			/>
		</Card>
	);
};

export default OverviewMainTable;
