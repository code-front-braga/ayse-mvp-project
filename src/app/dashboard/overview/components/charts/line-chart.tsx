'use client';

import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';

import {
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

interface DashboardLineChartProps {
	chartData: { month: string; total: number }[];
	chartConfig: ChartConfig;
}

const OverviewLineChart = ({ chartData }: DashboardLineChartProps) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={chartData} margin={{ top: 20, left: 8, right: 8 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={month => month.slice(0, 3)}
				/>
				<YAxis
					tickFormatter={value =>
						Number(value).toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
							minimumFractionDigits: 0,
						})
					}
					axisLine={false}
					tickLine={false}
				/>
				<ChartTooltip
					cursor={false}
					content={
						<ChartTooltipContent
							formatter={value =>
								value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
									minimumFractionDigits: 2,
								})
							}
							hideLabel
						/>
					}
				/>
				<Line
					dataKey="total"
					type="natural"
					stroke="var(--color-primary)"
					strokeWidth={2}
					dot={{ fill: 'var(--color-primary)' }}
					activeDot={{ r: 6 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
};

export default OverviewLineChart;
