import { Loading } from '@/components/ui/loading';

const PresentationLoading = () => {
	return (
		<div className="from-primary/10 to-primary/5 via-background min-h-screen bg-gradient-to-br">
			<Loading
				variant="page"
				size="lg"
				message="Carregando página inicial..."
				className="min-h-screen"
			/>
		</div>
	);
};

export default PresentationLoading;
