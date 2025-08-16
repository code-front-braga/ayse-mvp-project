import { PurchaseStatus } from 'generated/prisma';
import { Ban, Check, Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { COLORS } from '@/enums/colors';
import { translateStatus } from '@/helpers/translate-status';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
	status: PurchaseStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
	return (
		<Badge
			variant="secondary"
			className={cn(
				'flex items-center gap-1.5 px-2 py-0.5 text-xs',
				status === PurchaseStatus.CANCELLED && 'bg-red-200 text-red-800',
				status === PurchaseStatus.COMPLETED &&
					'bg-emerald-200 text-emerald-800',
				status === PurchaseStatus.IN_PROCESS && 'bg-yellow-100 text-yellow-800',
			)}
		>
			{status === PurchaseStatus.CANCELLED && <Ban color={COLORS.RED} />}
			{status === PurchaseStatus.COMPLETED && <Check color={COLORS.GREEN} />}
			{status === PurchaseStatus.IN_PROCESS && <Clock color={COLORS.YELLOW} />}
			{translateStatus(status)}
		</Badge>
	);
}
