import { CheckCircle } from 'lucide-react';

interface BenefitItemProps {
	text: string;
}

const BenefitItem = ({ text }: BenefitItemProps) => (
	<div className="flex items-center gap-2 sm:gap-3">
		<CheckCircle className="text-primary h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
		<span className="text-sm text-gray-700 sm:text-base">{text}</span>
	</div>
);

export default BenefitItem;
