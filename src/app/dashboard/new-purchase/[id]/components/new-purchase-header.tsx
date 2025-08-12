import { Purchase } from 'generated/prisma';

import { Separator } from '@/components/ui/separator';
import { stringUtils } from '@/helpers/string-utils';

interface NewPurchaseHeaderProps {
	purchase: Purchase;
}

const NewPurchaseHeader = ({ purchase }: NewPurchaseHeaderProps) => {
	return (
		<header className="flex flex-col items-start">
			<div className="flex flex-col gap-1 md:gap-0">
				<h2 className="font-zain text-primary text-2xl font-semibold md:text-4xl">
					{purchase.supermarket}
				</h2>
				<div className="flex h-4 items-center gap-2">
					<p className="text-muted-foreground text-xs">
						{stringUtils.formatDateToBRL(purchase.date)}
					</p>
					<Separator orientation="vertical" className="bg-primary" />
					<p className="text-muted-foreground text-xs">{purchase.address}</p>
				</div>
			</div>
		</header>
	);
};

export default NewPurchaseHeader;
