import {
	MapPin,
	PieChart,
	Receipt,
	ShoppingCart,
	Target,
	TrendingUp,
} from 'lucide-react';

import FeatureCard from './feature-card';

const LandingFeaturesSection = () => {
	return (
		<section id="recursos" className="container mx-auto px-4 py-12 sm:py-20">
			<div className="mb-12 text-center sm:mb-16">
				<h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-4xl">
					Recursos Inteligentes
				</h2>
				<p className="mx-auto max-w-2xl px-2 text-base text-gray-600 sm:text-xl">
					Ferramentas poderosas para transformar a forma como você controla seus
					gastos no supermercado
				</p>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
				<FeatureCard
					icon={<ShoppingCart className="text-primary h-6 w-6 sm:h-8 sm:w-8" />}
					title="Registro de Compras"
					description="Anote rapidamente todas as suas compras com categorização automática e histórico completo"
				/>
				<FeatureCard
					icon={<Receipt className="text-primary h-6 w-6 sm:h-8 sm:w-8" />}
					title="Controle de Gastos"
					description="Acompanhe em tempo real quanto você está gastando e compare com meses anteriores"
				/>
				<FeatureCard
					icon={<MapPin className="text-primary h-6 w-6 sm:h-8 sm:w-8" />}
					title="Supermercados Favoritos"
					description="Descubra onde você mais compra e compare preços entre diferentes estabelecimentos"
				/>
				<FeatureCard
					icon={<PieChart className="text-primary h-6 w-6 sm:h-8 sm:w-8" />}
					title="Análise por Categoria"
					description="Veja quanto gasta em cada categoria: alimentação, limpeza, higiene e muito mais"
				/>
				<FeatureCard
					icon={<TrendingUp className="text-primary h-6 w-6 sm:h-8 sm:w-8" />}
					title="Relatórios Detalhados"
					description="Gráficos e relatórios que mostram tendências de gastos e oportunidades de economia"
				/>
				<FeatureCard
					icon={<Target className="text-primary h-6 w-6 sm:h-8 sm:w-8" />}
					title="Metas de Economia"
					description="Defina orçamentos mensais e receba alertas para manter seus gastos sob controle"
				/>
			</div>
		</section>
	);
};

export default LandingFeaturesSection;
