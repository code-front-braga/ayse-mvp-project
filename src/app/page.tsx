import LandingBenefitsSection from './components/landing-benefits-section';
import LandingCtaSection from './components/landing-cta-section';
import LandingFeaturesSection from './components/landing-features-section';
import LandingFooter from './components/landing-footer';
import LandingHeader from './components/landing-header';
import LandingHeroSection from './components/landing-hero-section';

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
