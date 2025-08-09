interface FeatureCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
	<div className="border-primary/5 rounded-xl border bg-white p-4 shadow-lg transition-shadow hover:shadow-xl sm:p-6">
		<div className="mb-3 sm:mb-4">{icon}</div>
		<h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
			{title}
		</h3>
		<p className="text-sm leading-relaxed text-gray-600 sm:text-base">
			{description}
		</p>
	</div>
);

export default FeatureCard;
