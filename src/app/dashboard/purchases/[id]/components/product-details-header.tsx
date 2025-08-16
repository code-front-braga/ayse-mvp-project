import { Purchase } from 'generated/prisma';
import { Calendar, MapPin } from 'lucide-react';

import { CardTitle } from '@/components/ui/card';
import { stringUtils } from '@/helpers/string-utils';

interface ProductDetailsHeaderProps {
	purchase: Pick<Purchase, 'supermarket' | 'address' | 'date'>;
}

const ProductsDetailsHeader = ({ purchase }: ProductDetailsHeaderProps) => {
	return (
		<>
			<CardTitle className="text-primary text-xl">
				{purchase.supermarket}
			</CardTitle>
			<div className="flex flex-col space-y-2">
				<div className="text-muted-foreground flex items-center gap-1 text-sm">
					<MapPin className="h-3.5 w-3.5" />
					{purchase.address || 'Endereço não informado'}
				</div>
				<div className="text-muted-foreground flex items-center gap-1 text-sm">
					<Calendar className="h-3.5 w-3.5" />
					{stringUtils.formatDateToBRL(purchase.date)}
				</div>
			</div>
		</>
	);
};

export default ProductsDetailsHeader;
