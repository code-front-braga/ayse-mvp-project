import { LucideShoppingBag } from 'lucide-react';

interface EmptyChartStateProps {
	message: string;
}

const EmptyChartState = ({ message }: EmptyChartStateProps) => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
			<div className="rounded-full bg-muted p-3">
				<LucideShoppingBag className="h-6 w-6 text-muted-foreground" />
			</div>
			<p className="text-sm text-muted-foreground">{message}</p>
		</div>
	);
};

export default EmptyChartState;
