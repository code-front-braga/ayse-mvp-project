import { ShoppingCart } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';

const EmptyStateSkeleton = () => {
	return (
		<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
			<div className="bg-muted/50 rounded-full p-6 mb-6">
				<ShoppingCart className="h-12 w-12 text-muted-foreground animate-pulse" />
			</div>
			<Skeleton className="h-6 w-48 mb-2" />
			<Skeleton className="h-4 w-80 mb-2" />
			<Skeleton className="h-4 w-64 mb-6" />
			<Skeleton className="h-10 w-40" />
		</div>
	);
};

export default EmptyStateSkeleton;
