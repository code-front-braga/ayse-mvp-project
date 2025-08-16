'use client';

import { Table as TanstackTable } from '@tanstack/react-table';
import { useCallback } from 'react';

import { permanentDeletePurchaseAction } from '@/actions/purchase-actions/permanent-delete-purchase-action';
import GenericDataTable from '@/app/dashboard/components/shared/generic-data-table';
import { PurchaseType } from '@/app/dashboard/overview/components/table/supermarket-columns';

import usePurchaseColumns from '../../hooks/use-purchase-columns';
import PurchaseTableHeader from './purchase-table-header';

const MainPurchasesTable = ({ purchases }: { purchases: PurchaseType[] }) => {
	const deleteMultiplePurchases = useCallback(async (ids: string[]) => {
		try {
			await Promise.all(ids.map(id => permanentDeletePurchaseAction(id)));
		} catch (error) {
			console.error('Erro ao deletar compras:', error);
		}
	}, []);

	const handleDeleteRows = async (table: TanstackTable<PurchaseType>) => {
		const selectedRows = table.getSelectedRowModel().rows;
		const selectedIds = selectedRows.map(row => row.original.id);

		await deleteMultiplePurchases(selectedIds);
		table.resetRowSelection();
	};

	const columns = usePurchaseColumns();

	const initialSorting = [
		{
			id: 'supermarket',
			desc: false,
		},
	];

	return (
		<GenericDataTable
			data={purchases}
			columns={columns}
			emptyMessage="Não há compras cadastradas."
			initialSorting={initialSorting}
			headerComponent={table => (
				<PurchaseTableHeader
					table={table}
					onDeleteRows={() => handleDeleteRows(table)}
					checkboxId="purchase-checkbox"
				/>
			)}
		/>
	);
};

export default MainPurchasesTable;
