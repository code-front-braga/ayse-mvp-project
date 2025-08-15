import { PurchaseStatus } from 'generated/prisma';
import {
	ArrowUpRight,
	Medal,
	Minus,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

import { getCurrentMonthSpending } from '@/actions/purchase-actions/get-current-month-spending';
import { getLastPurchase } from '@/actions/purchase-actions/get-last-purchase';
import { mostVisitedSupermarket } from '@/actions/purchase-actions/most-visited-supermarket';
import { Badge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { COLORS } from '@/enums/colors';
import { stringUtils } from '@/helpers/string-utils';
import { prisma } from '@/lib/prisma-client';
import { cn } from '@/lib/utils';

import CardItem from './card-item';
import CustomCardActionWithTooltip from './custom-card-action-with-tooltip';
import EmptyState from './empty-state';

const Cards = async () => {
	const [
		allCompletedPurchases,
		lastPurchase,
		mostVisitedSupermarketData,
		currentMonthData,
	] = await Promise.all([
		prisma.purchase.findMany({
			where: { status: PurchaseStatus.COMPLETED },
			orderBy: { completedAt: 'desc' },
			include: { products: true },
		}),
		getLastPurchase(),
		mostVisitedSupermarket(),
		getCurrentMonthSpending(),
	]);

	if (!lastPurchase) {
		return <EmptyState />;
	}

	const totalSpent = allCompletedPurchases.reduce(
		(acc, cur) => acc + cur.total,
		0,
	);

	const renderTrendIcon = () => {
		switch (currentMonthData.changeType) {
			case 'increase':
				return <TrendingUp className="h-3 w-3" />;
			case 'decrease':
				return <TrendingDown className="h-3 w-3" />;
			default:
				return <Minus className="h-3 w-3" />;
		}
	};

	const renderTrendText = () => {
		if (!currentMonthData.hasCurrentMonthPurchases) {
			return 'Nenhuma compra este mês';
		}

		if (!currentMonthData.hasPreviousMonthPurchases) {
			return 'Primeiro mês com compras';
		}

		const changeText =
			currentMonthData.changeType === 'increase'
				? 'aumento'
				: currentMonthData.changeType === 'decrease'
					? 'redução'
					: 'sem alteração';

		return `${Math.round(currentMonthData.percentageChange)}% ${changeText} vs ${currentMonthData.previousMonthName}`;
	};

	const getTrendBadgeStyles = () => {
		switch (currentMonthData.changeType) {
			case 'increase':
				return 'bg-emerald-50 text-emerald-500';
			case 'decrease':
				return 'bg-rose-50 text-rose-500';
			default:
				return 'bg-gray-50 text-gray-500';
		}
	};

	return (
		<div className="*:data-[slot=card]:bg-background grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<CardItem
				description="Gasto Total"
				title={stringUtils.formatToCurrencyBRL(totalSpent)}
				actionChildren={
					<CustomCardActionWithTooltip
						badgeNumber={lastPurchase?.total}
						tooltipText="Valor somado após a última compra"
						variant="positive"
					/>
				}
				footerChildren={
					<span className="text-primary/75 line-clamp-1 text-xs font-medium md:text-sm">
						Valor acumulado
					</span>
				}
			/>

			<CardItem
				description="Compra Mais Recente"
				title={stringUtils.formatToCurrencyBRL(lastPurchase?.total)}
				actionChildren={
					<Badge className="text-primary/90 bg-primary/10 rounded-sm text-xs font-semibold">
						{stringUtils.formatDateToBRL(lastPurchase?.date)}
					</Badge>
				}
				footerChildren={
					<>
						<span className="text-primary/75 line-clamp-1 text-xs font-medium md:text-sm">
							Realizada no {lastPurchase?.supermarket}
						</span>
						<div className="flex w-full items-center justify-between">
							<span className="text-muted-foreground text-xs">
								{lastPurchase?.address}
							</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<Link href="">
										<ArrowUpRight size={12} className="text-primary/70" />
									</Link>
								</TooltipTrigger>
								<TooltipContent side="bottom" className="shadow-lg">
									<p>Ver detalhes da compra</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</>
				}
			/>

			<CardItem
				description="Mais Frequentado"
				title={mostVisitedSupermarketData.name}
				actionChildren={<Medal color={COLORS.PRIMARY} />}
				footerChildren={
					<>
						<span className="text-primary/75 line-clamp-1 text-xs font-medium md:text-sm">
							Total gasto:{' '}
							{stringUtils.formatToCurrencyBRL(
								mostVisitedSupermarketData.totalSpent,
							)}
						</span>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href=""
									className="text-primary flex items-center gap-1 text-xs underline underline-offset-2"
								>
									{mostVisitedSupermarketData.visitCount} visitas registradas
									<ArrowUpRight size={12} className="text-primary/70" />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="bottom" className="shadow-lg">
								<p>Ver compras</p>
							</TooltipContent>
						</Tooltip>
					</>
				}
			/>

			<CardItem
				description={`Gasto Em ${currentMonthData.currentMonthName}`}
				title={
					currentMonthData.hasCurrentMonthPurchases
						? stringUtils.formatToCurrencyBRL(
								currentMonthData.currentMonthTotal,
							)
						: 'R$ 0,00'
				}
				actionChildren={
					currentMonthData.hasCurrentMonthPurchases ? (
						<CustomCardActionWithTooltip
							badgeNumber={
								currentMonthData.currentMonthTotal /
								currentMonthData.currentMonthPurchasesCount
							}
							tooltipText="Valor médio por compra este mês"
							variant="positive"
						/>
					) : (
						<Badge
							variant="secondary"
							className="rounded-sm text-xs font-semibold"
						>
							Sem compras
						</Badge>
					)
				}
				footerChildren={
					<>
						{currentMonthData.hasCurrentMonthPurchases &&
							currentMonthData.changeType !== 'no-comparison' && (
								<Badge className={cn('rounded-sm text-xs font-semibold', getTrendBadgeStyles())}>
									{renderTrendIcon()}
									{Math.round(currentMonthData.percentageChange)}%
								</Badge>
							)}

						<Tooltip>
							<TooltipTrigger>
								<span className="text-primary line-clamp-1 cursor-help text-xs underline underline-offset-2">
									{renderTrendText()}
								</span>
							</TooltipTrigger>
							<TooltipContent side="bottom" className="shadow-lg">
								{currentMonthData.hasCurrentMonthPurchases
									? `${currentMonthData.currentMonthPurchasesCount} compras realizadas em ${currentMonthData.currentMonthName}`
									: `Nenhuma compra registrada em ${currentMonthData.currentMonthName}`}
							</TooltipContent>
						</Tooltip>
					</>
				}
			/>
		</div>
	);
};

export default Cards;
