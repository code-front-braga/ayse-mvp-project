import { ColumnDef, FilterFn } from '@tanstack/react-table';
import { useMemo } from 'react';

import { EditProductActionProps } from '@/actions/product-actions/edit-product-action';
import { Checkbox } from '@/components/ui/checkbox';
import { stringUtils } from '@/helpers/string-utils';
import { ProductType } from '@/hooks/use-optimistic-products';

import ProductRowActions from '../components/table/product-row-actions';

const categoryFilterFn: FilterFn<ProductType> = (
	row,
	columnId,
	filterValue: string[],
) => {
	if (!filterValue?.length) return true;
	const category = row.getValue(columnId) as string;
	return filterValue.includes(category);
};

const useProductColumns = (): ColumnDef<ProductType>[] => {
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
				header: 'Produto',
				accessorKey: 'name',
				cell: ({ row }) => (
					<span className="font-medium">{row.original.name}</span>
				),
				size: 140,
				enableHiding: false,
			},
			{
				header: 'Categoria',
				accessorKey: 'category',
				cell: ({ row }) => (
					<span className="text-muted-foreground">
						{stringUtils.toTitleCase(row.original.category)}
					</span>
				),
				size: 140,
			},
			{
				header: 'Preço',
				accessorKey: 'price',
				cell: ({ row }) => (
					<span className="text-muted-foreground">
						{stringUtils.formatToCurrencyBRL(row.original.price)}
					</span>
				),
				size: 120,
			},
			{
				header: 'Quantidade',
				accessorKey: 'quantity',
				cell: ({ row }) => (
					<span className="text-muted-foreground">
						{stringUtils.padWithZero(row.original.quantity)}
					</span>
				),

				size: 110,
				filterFn: categoryFilterFn,
			},
			{
				header: 'Total',
				accessorKey: 'total',
				cell: ({ row }) => {
					const calculatedTotal = row.original.price * row.original.quantity;
					return (
						<span className="text-foreground font-medium">
							{stringUtils.formatToCurrencyBRL(calculatedTotal)}
						</span>
					);
				},
				size: 110,
			},
			{
				id: 'actions',
				header: () => <span className="sr-only">Ações</span>,
				cell: ({ row }) => (
					<ProductRowActions product={row.original as EditProductActionProps} />
				),
				size: 60,
				enableHiding: false,
			},
		],
		[],
	);
};

export default useProductColumns;
