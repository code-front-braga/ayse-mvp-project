import { Loading } from '@/components/ui/loading';

const PurchaseDetailsLoading = () => {
	return (
		<div className="flex flex-col gap-4 md:gap-6 md:py-0">
			<Loading
				variant="page"
				size="lg"
				message="Carregando detalhes da compra..."
			/>
		</div>
	);
};

export default PurchaseDetailsLoading;
