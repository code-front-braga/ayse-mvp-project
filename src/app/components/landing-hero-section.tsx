import { SmartAuthButton } from '@/components/smart-auth-button';
import { Button } from '@/components/ui/button';

const LandingHeroSection = () => {
	return (
		<section className="container mx-auto px-4 py-12 text-center sm:py-20">
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-4 text-3xl leading-tight font-bold text-gray-900 sm:mb-6 sm:text-5xl md:text-6xl">
					Controle suas{' '}
					<span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
						compras{' '}
					</span>
					de supermercado
				</h1>
				<p className="mx-auto mb-6 max-w-2xl px-2 text-base text-gray-600 sm:mb-8 sm:text-xl">
					Gerencie todas as suas compras de supermercado, acompanhe gastos e
					descubra padrões de consumo para economizar mais.
				</p>
				<div className="flex flex-col justify-center gap-3 px-4 sm:flex-row sm:gap-4">
					<SmartAuthButton
						size="lg"
						className="w-full px-6 py-3 text-base sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
					>
						Começar a Economizar
					</SmartAuthButton>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="w-full px-6 py-3 text-base sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
					>
						<a href="#resources">Ver Como Funciona</a>
					</Button>
				</div>
			</div>
		</section>
	);
};

export default LandingHeroSection;
