import {
	BarChart3,
	Cpu,
	DollarSign,
	Download,
	LucideIcon,
	Palette,
	ShoppingBag,
} from 'lucide-react';

export interface Feature {
	id: string;
	icon: LucideIcon;
	title: string;
	description: string;
}

export const features: Feature[] = [
	{
		id: 'controle-gastos',
		icon: DollarSign,
		title: 'Controle de Gastos',
		description:
			'Monitore e gerencie todos os seus gastos de forma inteligente e organizada',
	},
	{
		id: 'exportar-pdf',
		icon: Download,
		title: 'Exportar Compra em PDF',
		description:
			'Gere relatórios em PDF das suas compras finalizadas para controle e arquivo',
	},
	{
		id: 'graficos-tabelas',
		icon: BarChart3,
		title: 'Gráficos e Tabelas',
		description:
			'Visualize suas compras através de gráficos interativos e tabelas detalhadas',
	},
	{
		id: 'interface-intuitiva',
		icon: Palette,
		title: 'Interface Intuitiva',
		description:
			'Design moderno e fácil de usar, pensado para uma experiência fluida e eficiente',
	},
	{
		id: 'controle-compras',
		icon: ShoppingBag,
		title: 'Controle de Compras',
		description:
			'Gerencie todas as suas compras com histórico completo e análises detalhadas',
	},
	{
		id: 'tecnologia-moderna',
		icon: Cpu,
		title: 'Tecnologia Moderna',
		description:
			'Desenvolvido com as mais recentes tecnologias para performance e confiabilidade',
	},
];
