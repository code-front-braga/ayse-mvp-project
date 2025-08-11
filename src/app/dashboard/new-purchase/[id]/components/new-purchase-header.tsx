import { Purchase } from 'generated/prisma';

import { Separator } from '@/components/ui/separator';
import { stringUtils } from '@/helpers/string-utils';

interface NewPurchaseHeaderProps {
	purchase: Purchase;
}

const NewPurchaseHeader = ({ purchase }: NewPurchaseHeaderProps) => {
	return (
		<header className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
			<div className="flex flex-col">
				<h2 className="font-zain text-primary text-2xl font-semibold md:text-4xl">
					{purchase.supermarket}
				</h2>
				<div className="flex h-4 items-center gap-2">
					<span className="text-muted-foreground text-xs">Data da compra</span>
					<Separator orientation="vertical" className="bg-primary" />
					<p className="text-muted-foreground text-xs">
						{stringUtils.formatDateToBRL(purchase.date)}
					</p>
				</div>
			</div>
			<p className="text-muted-foreground text-xs">{purchase.address}</p>
		</header>
	);
};

export default NewPurchaseHeader;
