import { ShoppingBag } from 'lucide-react';

const PurchasesPage = () => {
	return (
		<div className="flex flex-1 flex-col gap-4 p-4">
			<div className="flex items-center gap-2">
				<ShoppingBag className="h-6 w-6" />
				<h1 className="text-2xl font-bold">Minhas Compras</h1>
			</div>
			<div className="rounded-lg border bg-card p-6">
				<p className="text-muted-foreground">
					Aqui você pode visualizar e gerenciar suas compras.
				</p>
			</div>
		</div>
	);
};

export default PurchasesPage;