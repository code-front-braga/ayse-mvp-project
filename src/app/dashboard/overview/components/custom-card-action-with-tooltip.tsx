import { CircleQuestionMark } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { stringUtils } from '@/helpers/string-utils';

interface CustomCardActionWithTooltipProps {
	badgeNumber: number;
	tooltipText: string;
}

const CustomCardActionWithTooltip = ({
	badgeNumber,
	tooltipText,
}: CustomCardActionWithTooltipProps) => {
	return (
		<div className="flex items-center gap-1">
			<Badge className="rounded-sm bg-emerald-50 text-xs font-semibold text-emerald-500">
				+ {stringUtils.formatToCurrencyBRL(badgeNumber)}
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
