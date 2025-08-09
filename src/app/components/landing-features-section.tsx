import { features } from '../data/features';
import FeatureCard from './feature-card';

const LandingFeaturesSection = () => {
	return (
		<section id="resources" className="container mx-auto px-4 py-12 sm:py-20">
			<div className="mb-12 text-center sm:mb-16">
				<h2 className="mb-3 text-2xl font-bold text-gray-900 sm:mb-4 sm:text-4xl">
					Recursos Inteligentes
				</h2>
				<p className="mx-auto max-w-2xl px-2 text-base text-gray-600 sm:text-xl">
					Ferramentas poderosas para transformar a forma como você controla seus
					gastos no supermercado
				</p>
			</div>

			<div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
				{features.map(feature => {
					return (
						<FeatureCard
							key={feature.id}
							icon={feature.icon}
							title={feature.title}
							description={feature.description}
						/>
					);
				})}
			</div>
		</section>
	);
};

export default LandingFeaturesSection;
