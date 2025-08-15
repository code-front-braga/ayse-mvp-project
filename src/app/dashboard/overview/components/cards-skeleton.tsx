import { Card, CardFooter,CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CardsSkeleton = () => {
	return (
		<div className="grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			{Array.from({ length: 4 }).map((_, index) => (
				<Card key={index} className="bg-background shadow-xs">
					<CardHeader>
						<Skeleton className="h-4 w-20" />
						<Skeleton className="h-6 w-24" />
						<Skeleton className="h-4 w-4 rounded-full" />
					</CardHeader>
					<CardFooter className="flex-col items-start gap-1.5">
						<Skeleton className="h-3 w-32" />
						<Skeleton className="h-3 w-28" />
					</CardFooter>
				</Card>
			))}
		</div>
	);
};

export default CardsSkeleton;
