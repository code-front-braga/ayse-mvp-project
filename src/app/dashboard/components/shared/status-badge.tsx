import { PurchaseStatus } from 'generated/prisma';

import { Badge } from '@/components/ui/badge';
import { translateStatus } from '@/helpers/translate-status';
import { cn } from '@/lib/utils';

import { PurchaseType } from '../../overview/components/table/supermarket-columns';

interface StatusBadgeProps {
	status: PurchaseType['status'];
}

export function StatusBadge({ status }: StatusBadgeProps) {
	return (
		<Badge
			variant="secondary"
			className={cn('flex items-center gap-1.5 px-2 py-0.5 text-xs')}
		>
			{status === PurchaseStatus.CANCELLED && (
				<span className="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
			)}
			{status === PurchaseStatus.COMPLETED && (
				<span
					className="size-1.5 rounded-full bg-emerald-500"
					aria-hidden="true"
				/>
			)}
			{status === PurchaseStatus.IN_PROCESS && (
				<span className="bg-primary size-1.5 rounded-full" aria-hidden="true" />
			)}
			{translateStatus(status)}
		</Badge>
	);
}
