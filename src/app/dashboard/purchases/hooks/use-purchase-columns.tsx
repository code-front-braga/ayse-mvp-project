import { ColumnDef, FilterFn } from '@tanstack/react-table';
import { useMemo } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { stringUtils } from '@/helpers/string-utils';

import { StatusBadge } from '../../components/shared/status-badge';
import { PurchaseType } from '../../overview/components/table/supermarket-columns';
import PurchaseRowActions from '../components/table/purchase-row-actions';

const statusFilterFn: FilterFn<PurchaseType> = (
	row,
	columnId,
	filterValue: string[],
) => {
	if (!filterValue?.length) return true;
	const status = row.getValue(columnId) as string;
	return filterValue.includes(status);
};

const usePurchaseColumns = (): ColumnDef<PurchaseType>[] => {
	return useMemo(
		() => [
			{
				id: 'select',
				header: ({ table }) => (
					<Checkbox
						checked={
							table.getIsAllPageRowsSelected() ||
							(table.getIsSomePageRowsSelected() && 'indeterminate')
						}
						onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
						aria-label="Selecionar tudo"
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={value => row.toggleSelected(!!value)}
						aria-label="Selecionar linha"
					/>
				),
				size: 28,
				enableSorting: false,
				enableHiding: false,
			},
			{
				header: 'Supermercado',
				accessorKey: 'supermarket',
				cell: ({ row }) => (
					<span className="font-medium">{row.original.supermarket}</span>
				),
				size: 140,
				enableHiding: false,
			},
			{
				header: 'Endereço',
				accessorKey: 'address',
				cell: ({ row }) => (
					<span className="text-muted-foreground">{row.original.address}</span>
				),
				size: 140,
			},
			{
				header: 'Data da Compra',
				accessorKey: 'date',
				cell: ({ row }) => (
					<span className="text-muted-foreground">
						{stringUtils.formatDateToBRL(row.original.date)}
					</span>
				),
				size: 150,
			},
			{
				header: 'Status',
				accessorKey: 'status',
				cell: ({ row }) => <StatusBadge status={row.original.status} />,
				size: 140,
				filterFn: statusFilterFn,
			},
			{
				header: 'Valor Total',
				accessorKey: 'total',
				cell: ({ row }) => (
					<span className="text-foreground font-medium">
						{stringUtils.formatToCurrencyBRL(row.original.total) || 'R$ 0,00'}
					</span>
				),
				size: 80,
			},
			{
				id: 'actions',
				header: () => <span className="sr-only">Ações</span>,
				cell: ({ row }) => (
					<PurchaseRowActions purchase={row.original as PurchaseType} />
				),

				size: 60,
				enableHiding: false,
			},
		],
		[],
	);
};

export default usePurchaseColumns;
