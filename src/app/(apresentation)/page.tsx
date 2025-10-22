import { Metadata } from 'next';

import LandingBenefitsSection from '../components/landing-benefits-section';
import LandingCtaSection from '../components/landing-cta-section';
import LandingFeaturesSection from '../components/landing-features-section';
import LandingFooter from '../components/landing-footer';
import LandingHeader from '../components/landing-header';
import LandingHeroSection from '../components/landing-hero-section';

export const metadata: Metadata = {
	title: 'ayse - all your supermarket expenses',
	description: 'Acesse sua conta e comece a usar o Ayse',
	keywords: [
		'supermercados',
		'compras',
		'financeiro',
		'ayse',
		'dinheiro',
		'nextjs',
	],
	authors: [{ name: 'Leonardo Braga' }],
	openGraph: {
		images: [`${process.env.PROJECT_URL}/landing.png`],
		url: `${process.env.PROJECT_URL}`,
		siteName: 'Ayse',
		title: 'ayse - all your supermarket expenses',
		description:
			'Aplicação MVP desenvolvida com Next.js e tecnologias modernas',
		type: 'website',
		locale: 'pt_BR',
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
		},
	},
};

const LandingPage = () => {
	return (
		<div className="from-primary/10 to-primary/5 via-background min-h-screen bg-gradient-to-br">
			<LandingHeader />
			<LandingHeroSection />
			<LandingFeaturesSection />
			<LandingBenefitsSection />
			<LandingCtaSection />
			<LandingFooter />
		</div>
	);
};

export default LandingPage;
