import type { Metadata } from 'next';

import Cards from './components/cards';
import DashboardHeader from '../components/shared/dashboard-header';

export const metadata: Metadata = {
	title: 'Visão Geral',
	description: 'Visão geral do dashboard',
};

const OverviewPage = () => {
	return (
		<>
			<DashboardHeader
				title="Visão Geral"
				description="Suas últimas atividades no sistema"
			/>
			<Cards />
		</>
	);
};

export default OverviewPage;
