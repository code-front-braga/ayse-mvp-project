import { Table } from '@tanstack/react-table';

import DeleteSelectedDialog from '@/app/dashboard/components/shared/delete-selected-dialog';
import SearchInput from '@/app/dashboard/components/shared/search-input';
import StatusFilterPopover from '@/app/dashboard/components/shared/status-filter-popover';
import { ProductType } from '@/hooks/use-optimistic-products';

interface ProductsTableHeaderProps {
	table: Table<ProductType>;
	onDeleteRows: () => void;
	checkboxId: string;
}

const ProductsTableHeader = ({
	table,
	onDeleteRows,
	checkboxId,
}: ProductsTableHeaderProps) => {
	const categoryColumn = table.getColumn('category');
	const categoryFacetedValues = categoryColumn?.getFacetedUniqueValues();
	const categoryFilterValue = categoryColumn?.getFilterValue();

	const uniqueStatusValues = Array.from(
		categoryFacetedValues?.keys() ?? [],
	).sort();

	const handleStatusChange = (checked: boolean, value: string) => {
		const filterValue = categoryColumn?.getFilterValue() as string[];
		const newFilterValue = filterValue ? [...filterValue] : [];

		if (checked) {
			newFilterValue.push(value);
		} else {
			const index = newFilterValue.indexOf(value);
			if (index > -1) {
				newFilterValue.splice(index, 1);
			}
		}

		categoryColumn?.setFilterValue(
			newFilterValue.length ? newFilterValue : undefined,
		);
	};

	const categoryCounts = categoryFacetedValues ?? new Map();
	const selectedCategories = (categoryFilterValue as string[]) ?? [];

	return (
		<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
			<div className="flex items-center gap-3">
				<SearchInput
					id={`${checkboxId}-input`}
					value={(table.getColumn('name')?.getFilterValue() ?? '') as string}
					onChange={value => table.getColumn('name')?.setFilterValue(value)}
					aria-label="Pesquisar por produto"
					placeholder="Pesquisar por produto"
				/>
			</div>
			<div className="flex items-center gap-3">
				{table.getSelectedRowModel().rows.length > 0 && (
					<DeleteSelectedDialog
						selectedCount={table.getSelectedRowModel().rows.length}
						onDelete={onDeleteRows}
						singularText="produto selecionado"
						pluralText="produtos selecionados"
					/>
				)}

				<StatusFilterPopover
					id={checkboxId}
					selectedType={selectedCategories}
					uniqueTypeValues={uniqueStatusValues}
					typeCounts={categoryCounts}
					onTypeChange={handleStatusChange}
					text="CATEGORIA"
				/>
			</div>
		</div>
	);
};

export default ProductsTableHeader;
