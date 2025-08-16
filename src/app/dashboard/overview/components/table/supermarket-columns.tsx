import type { ColumnDef } from '@tanstack/react-table';
import { Purchase } from 'generated/prisma';

import { StatusBadge } from '@/app/dashboard/components/shared/status-badge';
import { stringUtils } from '@/helpers/string-utils';

export type PurchaseType = Pick<
	Purchase,
	'id' | 'supermarket' | 'address' | 'date' | 'status' | 'total'
>;

const supermarketColumns: ColumnDef<PurchaseType>[] = [
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
		header: 'Data da compra',
		accessorKey: 'date',
		cell: ({ row }) => (
			<span className="text-muted-foreground">
				{stringUtils.formatDateToBRL(row.original.date)}
			</span>
		),
		size: 120,
	},
	{
		header: 'Status',
		accessorKey: 'status',
		cell: ({ row }) => <StatusBadge status={row.original.status} />,
		size: 110,
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
];

export default supermarketColumns;
