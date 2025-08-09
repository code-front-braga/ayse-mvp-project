import {
	ChartNoAxesCombined,
	CheckCircle,
	MapPin,
	PieChart,
	Receipt,
	ShoppingCart,
	Target,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { AppRoutes } from '@/enums/app-routes';

const ApresentacaoPage = () => {
	return (
		<div className="from-primary/10 to-primary/5 min-h-screen bg-gradient-to-br via-white">
			{/* Header */}
			<header className="container mx-auto px-4 py-4 sm:py-6">
				<nav className="flex items-center justify-between">
					<div className="flex items-center gap-2 sm:gap-3">
						<ChartNoAxesCombined className="text-primary h-6 w-6 sm:h-8 sm:w-8" />
						<div className="flex flex-col">
							<span className="text-lg font-bold text-gray-900 sm:text-2xl">ayse</span>
							<span className="-mt-1 text-xs text-gray-500 hidden sm:block">
								all your supermarket expenses
							</span>
						</div>
					</div>
					<div className="flex items-center gap-2 sm:gap-4">
						<Button asChild variant="ghost" size="sm" className="hidden sm:flex">
							<Link href={AppRoutes.SIGN_IN}>Entrar</Link>
						</Button>
						<Button asChild size="sm" className="text-xs sm:text-sm px-3 sm:px-4">
							<Link href={AppRoutes.SIGN_UP}>
								<span className="sm:hidden">Começar</span>
								<span className="hidden sm:inline">Começar Agora</span>
							</Link>
						</Button>
					</div>
				</nav>
			</header>

			{/* Hero Section */}
			<section className="container mx-auto px-4 py-12 sm:py-20 text-center">
				<div className="mx-auto max-w-4xl">
					<h1 className="mb-4 sm:mb-6 text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
						Controle suas
						<span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
							{' '}
							compras{' '}
						</span>
						de supermercado
					</h1>
					<p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-base sm:text-xl text-gray-600 px-2">
						Gerencie todas as suas compras de supermercado, acompanhe gastos e
						descubra padrões de consumo para economizar mais.
					</p>
					<div className="flex flex-col justify-center gap-3 sm:gap-4 sm:flex-row px-4">
						<Button asChild size="lg" className="px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
							<Link href={AppRoutes.SIGN_UP}>Começar a Economizar</Link>
						</Button>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
						>
							<Link href="#recursos">Ver Como Funciona</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="recursos" className="container mx-auto px-4 py-12 sm:py-20">
				<div className="mb-12 sm:mb-16 text-center">
					<h2 className="mb-3 sm:mb-4 text-2xl sm:text-4xl font-bold text-gray-900">
						Recursos Inteligentes
					</h2>
					<p className="mx-auto max-w-2xl text-base sm:text-xl text-gray-600 px-2">
						Ferramentas poderosas para transformar a forma como você controla
						seus gastos no supermercado
					</p>
				</div>

				<div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

			{/* Benefits Section */}
			<section className="bg-primary/5 py-12 sm:py-20">
				<div className="container mx-auto px-4">
					<div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
						<div className="order-2 lg:order-1">
							<h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-bold text-gray-900 text-center lg:text-left">
								Por que escolher o ayse?
							</h2>
							<div className="space-y-3 sm:space-y-4">
								<BenefitItem text="Interface simples e intuitiva" />
								<BenefitItem text="Categorização automática de produtos" />
								<BenefitItem text="Relatórios de gastos detalhados" />
								<BenefitItem text="Alertas de orçamento personalizados" />
								<BenefitItem text="Comparação entre supermercados" />
								<BenefitItem text="Histórico completo de compras" />
							</div>
						</div>
						<div className="order-1 lg:order-2 border-primary/10 rounded-2xl border bg-white p-6 sm:p-8 shadow-xl">
							<div className="text-center">
								<div className="text-primary mb-2 text-4xl sm:text-5xl font-bold">100%</div>
								<div className="mb-4 sm:mb-6 text-gray-600">Gratuito para começar</div>
								<Button asChild size="lg" className="w-full text-sm sm:text-base">
									<Link href={AppRoutes.SIGN_UP}>Criar Conta Agora</Link>
								</Button>
								<p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
									Sem cartão de crédito necessário
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="container mx-auto px-4 py-12 sm:py-20 text-center">
				<div className="mx-auto max-w-3xl">
					<h2 className="mb-4 sm:mb-6 text-2xl sm:text-4xl font-bold text-gray-900">
						Pronto para economizar nas compras?
					</h2>
					<p className="mb-6 sm:mb-8 text-base sm:text-xl text-gray-600 px-2">
						Junte-se a milhares de usuários que já estão controlando seus gastos
						no supermercado
					</p>
					<Button asChild size="lg" className="px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg w-full sm:w-auto">
						<Link href={AppRoutes.SIGN_UP}>Começar Agora - É Grátis</Link>
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 py-8 sm:py-12 text-white">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center justify-between space-y-4 sm:space-y-0 md:flex-row">
						<div className="flex items-center gap-2">
							<ChartNoAxesCombined className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
							<span className="text-lg sm:text-xl font-bold">ayse</span>
						</div>
						<div className="flex gap-4 sm:gap-6 text-sm sm:text-base">
							<Link
								href="#"
								className="text-gray-400 transition-colors hover:text-white"
							>
								Privacidade
							</Link>
							<Link
								href="#"
								className="text-gray-400 transition-colors hover:text-white"
							>
								Termos
							</Link>
							<Link
								href="#"
								className="text-gray-400 transition-colors hover:text-white"
							>
								Suporte
							</Link>
						</div>
					</div>
					<div className="mt-6 sm:mt-8 border-t border-gray-800 pt-6 sm:pt-8 text-center text-gray-400">
						<p className="text-xs sm:text-sm">&copy; 2025 ayse. Todos os direitos reservados.</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
	<div className="border-primary/5 rounded-xl border bg-white p-4 sm:p-6 shadow-lg transition-shadow hover:shadow-xl">
		<div className="mb-3 sm:mb-4">{icon}</div>
		<h3 className="mb-2 text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
		<p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
	</div>
);

interface BenefitItemProps {
	text: string;
}

const BenefitItem = ({ text }: BenefitItemProps) => (
	<div className="flex items-center gap-2 sm:gap-3">
		<CheckCircle className="text-primary h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
		<span className="text-sm sm:text-base text-gray-700">{text}</span>
	</div>
);

export default ApresentacaoPage;
