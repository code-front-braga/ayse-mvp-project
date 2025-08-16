import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

import { getMonthlyPurchases } from '../../../../../actions/purchase-actions/get-monthly-purchases';
import OverviewBarChart from './bar-chart';
import EmptyChartState from './empty-chart-state';
import OverviewLineChart from './line-chart';

const chartConfig = {
	total: {
		label: 'Total',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig;

const MainCharts = async () => {
	const chartData = await getMonthlyPurchases();
	const hasData = chartData.some(item => item.total > 0);

	return (
		<Card className="bg-background shadow">
			<CardHeader>
				<CardTitle>Gastos Mensais</CardTitle>
				<CardDescription>Resumo de compras nos últimos meses</CardDescription>
			</CardHeader>
			<CardContent className="h-[350px] w-full">
				{hasData ? (
					<ChartContainer config={chartConfig} className="h-full w-full">
						<div className="h-full w-full">
							<div className="hidden h-full w-full md:block">
								<OverviewBarChart
									chartData={chartData}
									chartConfig={chartConfig}
								/>
							</div>

							<div className="block h-full w-full md:hidden">
								<OverviewLineChart
									chartData={chartData}
									chartConfig={chartConfig}
								/>
							</div>
						</div>
					</ChartContainer>
				) : (
					<EmptyChartState message="Ainda não há dados de compras suficientes para exibir o gráfico. Faça suas primeiras compras para visualizar seus gastos mensais." />
				)}
			</CardContent>
		</Card>
	);
};

export default MainCharts;
