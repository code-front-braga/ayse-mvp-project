'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from 'recharts';

import {
	ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

interface DashboardBarChartProps {
	chartData: { month: string; total: number }[];
	chartConfig: ChartConfig;
}

const OverviewBarChart = ({ chartData }: DashboardBarChartProps) => {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={chartData} barSize={94} margin={{ top: 20 }}>
				<CartesianGrid vertical={false} strokeDasharray="3 3" />
				<XAxis
					dataKey="month"
					tickLine={false}
					tickMargin={10}
					axisLine={false}
					tickFormatter={month => month.slice(0, 3)}
				/>
				<YAxis
					tickFormatter={value =>
						Number(value).toLocaleString('pt-br', {
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
				<Bar dataKey="total" fill="var(--color-primary)" radius={8}>
					<LabelList
						position="top"
						offset={12}
						fontSize={12}
						formatter={(value: number) =>
							value.toLocaleString('pt-br', {
								style: 'currency',
								currency: 'BRL',
								minimumFractionDigits: 2,
							})
						}
						className="fill-primary/70"
					/>
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};

export default OverviewBarChart;
