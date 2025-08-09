import { LayoutGrid, ShoppingBag } from 'lucide-react';

import { AppRoutes } from '@/enums/app-routes';

export const sidebarLinks = {
	user: {
		name: 'Leonardo Primo Viana Braga',
		email: 'programer_frontbraga@outlook.com',
		avatar: '/avatars/shadcn.jpg',
	},
	navMain: [
		{
			label: 'Visão geral',
			icon: LayoutGrid,
			href: AppRoutes.DASHBOARD_OVERVIEW,
		},
		{
			label: 'Minhas compras',
			icon: ShoppingBag,
			href: AppRoutes.DASHBOARD_PURCHASES,
		},
	],
};
