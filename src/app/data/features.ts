import {
	LucideIcon,
	MapPin,
	PieChart,
	Receipt,
	ShoppingCart,
	Target,
	TrendingUp,
} from 'lucide-react';

export interface Feature {
	id: string;
	icon: LucideIcon;
	title: string;
	description: string;
}

export const features: Feature[] = [
	{
		id: 'digitalizacao-notas',
		icon: Receipt,
		title: 'Digitalização de Notas',
		description:
			'Escaneie suas notas fiscais e tenha todos os dados organizados automaticamente',
	},
	{
		id: 'controle-gastos',
		icon: ShoppingCart,
		title: 'Controle de Gastos',
		description:
			'Acompanhe seus gastos em tempo real e saiba exatamente onde seu dinheiro está sendo gasto',
	},
	{
		id: 'localizacao-produtos',
		icon: MapPin,
		title: 'Localização de Produtos',
		description:
			'Encontre os melhores preços nos supermercados próximos a você',
	},
	{
		id: 'analise-categorias',
		icon: PieChart,
		title: 'Análise por Categorias',
		description:
			'Veja quanto gasta em cada categoria: alimentação, limpeza, higiene e muito mais',
	},
	{
		id: 'relatorios-detalhados',
		icon: TrendingUp,
		title: 'Relatórios Detalhados',
		description:
			'Gráficos e relatórios que mostram tendências de gastos e oportunidades de economia',
	},
	{
		id: 'metas-economia',
		icon: Target,
		title: 'Metas de Economia',
		description:
			'Defina orçamentos mensais e receba alertas para manter seus gastos sob controle',
	},
];
