import { ShoppingCart } from 'lucide-react';

import { COLORS } from '@/enums/colors';

import DrawerDialogPurchaseForm from '../../components/sidebar/drawer-dialog-purchase-form';

const EmptyState = () => {
	return (
		<div className="flex flex-col items-center justify-center px-4 py-16 text-center">
			<div className="bg-sidebar mb-6 rounded-full p-6">
				<ShoppingCart color={COLORS.PRIMARY} size={48} />
			</div>
			<h3 className="mb-2 text-lg font-semibold md:text-xl">
				Nenhuma compra registrada
			</h3>
			<p className="text-muted-foreground mb-6 max-w-md text-sm md:text-base">
				Você ainda não registrou nenhuma compra. Comece criando sua primeira
				compra para acompanhar seus gastos.
			</p>
			<div>
				<DrawerDialogPurchaseForm />
			</div>
		</div>
	);
};

export default EmptyState;
