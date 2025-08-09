import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Overview',
	description: 'Visão geral do dashboard',
};

const OverviewPage = () => {
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Overview</h2>
				<p className="text-muted-foreground">
					Bem-vindo ao seu painel de controle
				</p>
			</div>
			
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Total de Usuários</h3>
					</div>
					<div className="text-2xl font-bold">0</div>
					<p className="text-xs text-muted-foreground">
						Usuários cadastrados na plataforma
					</p>
				</div>
				
				<div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div className="flex flex-row items-center justify-between space-y-0 pb-2">
						<h3 className="text-sm font-medium">Ativo</h3>
					</div>
					<div className="text-2xl font-bold">Sistema</div>
					<p className="text-xs text-muted-foreground">
						Status da aplicação
					</p>
				</div>
			</div>
		</div>
	);
};

export default OverviewPage;
