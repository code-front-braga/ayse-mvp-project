import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProductTableSkeleton = () => {
	return (
		<div className="flex h-full flex-col">
			{/* Summary Skeleton */}
			<Card className="mb-4 p-4">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-6 w-24" />
					</div>
					<div className="flex gap-2">
						<Skeleton className="h-9 w-24" />
						<Skeleton className="h-9 w-24" />
						<Skeleton className="h-9 w-32" />
					</div>
				</div>
			</Card>

			{/* Table Header Skeleton */}
			<div className="mb-4 flex items-center justify-between">
				<Skeleton className="h-9 w-64" />
				<div className="flex gap-2">
					<Skeleton className="h-9 w-24" />
					<Skeleton className="h-9 w-9" />
				</div>
			</div>

			{/* Table Skeleton */}
			<Card className="bg-sidebar flex flex-1 flex-col shadow-md">
				<div className="flex flex-1 flex-col p-4">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead><Skeleton className="h-4 w-4" /></TableHead>
								<TableHead><Skeleton className="h-4 w-20" /></TableHead>
								<TableHead><Skeleton className="h-4 w-16" /></TableHead>
								<TableHead><Skeleton className="h-4 w-12" /></TableHead>
								<TableHead><Skeleton className="h-4 w-16" /></TableHead>
								<TableHead><Skeleton className="h-4 w-16" /></TableHead>
								<TableHead><Skeleton className="h-4 w-8" /></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 5 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell><Skeleton className="h-4 w-4" /></TableCell>
									<TableCell><Skeleton className="h-4 w-32" /></TableCell>
									<TableCell><Skeleton className="h-4 w-20" /></TableCell>
									<TableCell><Skeleton className="h-4 w-12" /></TableCell>
									<TableCell><Skeleton className="h-4 w-16" /></TableCell>
									<TableCell><Skeleton className="h-4 w-16" /></TableCell>
									<TableCell><Skeleton className="h-4 w-8" /></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</Card>
		</div>
	);
};

export default ProductTableSkeleton;
