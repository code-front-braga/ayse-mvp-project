import { Metadata } from 'next';

import DashboardHeader from '../components/shared/dashboard-header';

export const metadata: Metadata = {
	title: 'Minhas Compras',
	description: 'Aqui você pode visualizar e gerenciar suas compras.',
};

const PurchasesPage = () => {
	return (
		<>
			<DashboardHeader
				title="Minhas Compras"
				description="Aqui você pode visualizar e gerenciar suas compras."
			/>
		</>
	);
};

export default PurchasesPage;
