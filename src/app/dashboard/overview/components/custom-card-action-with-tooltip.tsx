import { CircleQuestionMark } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { stringUtils } from '@/helpers/string-utils';
import { cn } from '@/lib/utils';

interface CustomCardActionWithTooltipProps {
	badgeNumber: number;
	tooltipText: string;
	variant?: 'positive' | 'negative' | 'neutral';
}

const CustomCardActionWithTooltip = ({
	badgeNumber,
	tooltipText,
	variant = 'neutral',
}: CustomCardActionWithTooltipProps) => {
	const getBadgeStyles = () => {
		switch (variant) {
			case 'positive':
				return 'bg-emerald-50 text-emerald-500';
			case 'negative':
				return 'bg-rose-50 text-rose-500';
			default:
				return 'bg-emerald-50 text-emerald-500';
		}
	};

	const getPrefix = () => {
		if (variant === 'negative') return '- ';
		if (variant === 'positive') return '+ ';
		return '+ ';
	};

	return (
		<div className="flex items-center gap-1">
			<Badge
				className={cn('rounded-sm text-xs font-semibold', getBadgeStyles())}
			>
				{getPrefix()}
				{stringUtils.formatToCurrencyBRL(Math.abs(badgeNumber))}
			</Badge>
			<Tooltip>
				<TooltipTrigger>
					<CircleQuestionMark size={12} className="text-primary/70" />
				</TooltipTrigger>
				<TooltipContent side="left" className="shadow-lg">
					<p>{tooltipText}</p>
				</TooltipContent>
			</Tooltip>
		</div>
	);
};

export default CustomCardActionWithTooltip;
