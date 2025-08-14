import { ColumnDef, flexRender, Table } from '@tanstack/react-table';

import { TableBody, TableCell, TableRow } from '@/components/ui/table';

interface CustomTableBodyProps<TData> {
	columns: ColumnDef<TData>[];
	emptyMessage?: string;
	table: Table<TData>;
}

const CustomTableBody = <TData,>({
	table,
	columns,
	emptyMessage,
}: CustomTableBodyProps<TData>) => {
	return (
		<TableBody>
			{table.getRowModel().rows?.length ? (
				table.getRowModel().rows.map(row => (
					<TableRow key={row.id} className="hover:bg-primary/10">
						{row.getVisibleCells().map(cell => (
							<TableCell key={cell.id} className="truncate text-xs lg:text-sm">
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</TableCell>
						))}
					</TableRow>
				))
			) : (
				<TableRow>
					<TableCell
						colSpan={columns.length}
						className="text-muted-foreground text-start md:text-center"
					>
						{emptyMessage}
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	);
};

export default CustomTableBody;
