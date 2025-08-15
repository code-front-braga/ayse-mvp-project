import { Loading } from '@/components/ui/loading';

const PurchasesLoading = () => {
	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">Minhas Compras</h1>
				<p className="text-muted-foreground">
					Aqui você pode visualizar e gerenciar suas compras.
				</p>
			</div>
			<Loading
				variant="page"
				size="lg"
				message="Carregando suas compras..."
			/>
		</>
	);
};

export default PurchasesLoading;
