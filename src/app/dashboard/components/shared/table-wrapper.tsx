import { flexRender, Table as TableType } from '@tanstack/react-table';

import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface TableWrapperProps<TData> {
	table: TableType<TData>;
	tBodyChildren: React.ReactNode;
}

const TableWrapper = <TData,>({
	table,
	tBodyChildren,
}: TableWrapperProps<TData>) => {
	return (
		<div className="flex min-h-0 flex-1 flex-col">
			<div className="flex-1 overflow-auto">
				<Table className="h-full table-fixed border-separate border-spacing-0 [&_tr:not(:last-child)_td]:border-b">
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
					{tBodyChildren}
					<tbody aria-hidden="true" className="table-row h-1"></tbody>
				</Table>
			</div>
		</div>
	);
};

export default TableWrapper;
