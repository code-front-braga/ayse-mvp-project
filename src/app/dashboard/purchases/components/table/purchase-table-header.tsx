import { Table } from '@tanstack/react-table';

import DeleteSelectedDialog from '@/app/dashboard/components/shared/delete-selected-dialog';
import SearchInput from '@/app/dashboard/components/shared/search-input';
import StatusFilterPopover from '@/app/dashboard/components/shared/status-filter-popover';
import { PurchaseType } from '@/app/dashboard/overview/components/table/supermarket-columns';

interface PurchaseTableHeaderProps {
	table: Table<PurchaseType>;
	onDeleteRows: () => void;
	checkboxId: string;
}

const PurchaseTableHeader = ({
	table,
	onDeleteRows,
	checkboxId,
}: PurchaseTableHeaderProps) => {
	const statusColumn = table.getColumn('status');
	const statusFacetedValues = statusColumn?.getFacetedUniqueValues();
	const statusFilterValue = statusColumn?.getFilterValue();

	const uniqueStatusValues = Array.from(
		statusFacetedValues?.keys() ?? [],
	).sort();

	const handleStatusChange = (checked: boolean, value: string) => {
		const filterValue = statusColumn?.getFilterValue() as string[];
		const newFilterValue = filterValue ? [...filterValue] : [];

		if (checked) {
			newFilterValue.push(value);
		} else {
			const index = newFilterValue.indexOf(value);
			if (index > -1) {
				newFilterValue.splice(index, 1);
			}
		}

		statusColumn?.setFilterValue(
			newFilterValue.length ? newFilterValue : undefined,
		);
	};

	const statusCounts = statusFacetedValues ?? new Map();
	const selectedStatus = (statusFilterValue as string[]) ?? [];

	return (
		<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
			<div className="flex items-center gap-3">
				<SearchInput
					id={`${checkboxId}-input`}
					value={
						(table.getColumn('supermarket')?.getFilterValue() ?? '') as string
					}
					onChange={value =>
						table.getColumn('supermarket')?.setFilterValue(value)
					}
					aria-label="Pesquisar por supermercado"
					placeholder="Pesquisar por supermercado"
				/>
			</div>
			<div className="flex items-center gap-3">
				{table.getSelectedRowModel().rows.length > 0 && (
					<DeleteSelectedDialog
						selectedCount={table.getSelectedRowModel().rows.length}
						onDelete={onDeleteRows}
						singularText="compra selecionada"
						pluralText="compras selecionadas"
					/>
				)}

				<StatusFilterPopover
					id={checkboxId}
					selectedType={selectedStatus}
					uniqueTypeValues={uniqueStatusValues}
					typeCounts={statusCounts}
					onTypeChange={handleStatusChange}
					text="STATUS"
				/>
			</div>
		</div>
	);
};

export default PurchaseTableHeader;
