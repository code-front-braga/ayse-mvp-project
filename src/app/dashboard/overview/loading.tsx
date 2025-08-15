import { Loading } from '@/components/ui/loading';

const OverviewLoading = () => {
	return (
		<>
			<div className="mb-6">
				<h1 className="text-2xl font-bold tracking-tight">Visão Geral</h1>
				<p className="text-muted-foreground">
					Suas últimas atividades no sistema
				</p>
			</div>
			<Loading
				variant="page"
				size="lg"
				message="Carregando dados da visão geral..."
			/>
		</>
	);
};

export default OverviewLoading;
