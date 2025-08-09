import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { AppRoutes } from '@/enums/app-routes';

import { benefits } from '../data/benefits';
import BenefitItem from './benefit-item';

const LandingBenefitsSection = () => {
	return (
		<section className="bg-primary/15 py-12 sm:py-20">
			<div className="container mx-auto px-4">
				<div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
					<div className="order-2 lg:order-1">
						<h2 className="mb-4 text-center text-2xl font-bold text-gray-900 sm:mb-6 sm:text-4xl lg:text-left">
							Por que escolher o ayse?
						</h2>
						<div className="space-y-3 sm:space-y-4">
							{benefits.map(benefit => (
								<BenefitItem key={benefit.id} text={benefit.text} />
							))}
						</div>
					</div>
					<div className="border-primary/10 order-1 rounded-2xl border bg-white p-6 shadow-xl sm:p-8 lg:order-2">
						<div className="text-center">
							<div className="text-primary mb-2 text-4xl font-bold sm:text-5xl">
								100%
							</div>
							<div className="mb-4 text-gray-600 sm:mb-6">
								Gratuito para começar
							</div>
							<Button asChild size="lg" className="w-full text-sm sm:text-base">
								<Link href={AppRoutes.SIGN_UP}>Criar Conta Agora</Link>
							</Button>
							<p className="mt-3 text-xs text-gray-500 sm:mt-4 sm:text-sm">
								Sem cartão de crédito necessário
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default LandingBenefitsSection;
