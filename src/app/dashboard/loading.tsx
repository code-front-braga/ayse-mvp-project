import { Loading } from '@/components/ui/loading';

const DashboardLoading = () => {
	return (
		<div className="flex flex-1 flex-col px-4">
			<div className="@container/main flex flex-1 flex-col gap-2">
				<div className="flex flex-col gap-2 py-4 md:gap-4 md:py-6">
					<Loading
						variant="page"
						size="lg"
						message="Carregando dashboard..."
					/>
				</div>
			</div>
		</div>
	);
};

export default DashboardLoading;