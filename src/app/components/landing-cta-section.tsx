import { SmartAuthButton } from '@/components/smart-auth-button';

const LandingCtaSection = () => {
	return (
		<section className="container mx-auto px-4 py-12 text-center sm:py-20">
			<div className="mx-auto max-w-3xl">
				<h2 className="mb-4 text-2xl font-bold text-gray-900 sm:mb-6 sm:text-4xl">
					Pronto para economizar nas compras?
				</h2>
				<p className="mb-6 px-2 text-base text-gray-600 sm:mb-8 sm:text-xl">
					Junte-se a milhares de usuários que já estão controlando seus gastos
					no supermercado
				</p>
				<SmartAuthButton
					size="lg"
					className="w-full px-6 py-3 text-base sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
				>
					Começar Agora - É Grátis
				</SmartAuthButton>
			</div>
		</section>
	);
};

export default LandingCtaSection;
