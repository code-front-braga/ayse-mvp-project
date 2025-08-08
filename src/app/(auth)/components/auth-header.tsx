import { ChartNoAxesCombined } from 'lucide-react';

import { COLORS } from '@/enums/colors';

export const AuthHeader = () => {
	return (
		<header className="flex flex-col items-center gap-1">
			<div className="flex items-center gap-1">
				<h1 className="font-inter text-primary text-3xl md:text-4xl">ayse</h1>
				<ChartNoAxesCombined
					color={COLORS.PRIMARY}
					size={16}
					className="self-baseline"
				/>
			</div>
			<p className="text-muted-foreground self-baseline text-xs">
				all your supermarket expenses
			</p>
		</header>
	);
};
