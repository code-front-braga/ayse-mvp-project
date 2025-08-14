import { ArrowUpRight, Medal, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { COLORS } from '@/enums/colors';
import { stringUtils } from '@/helpers/string-utils';

import CustomCardActionWithTooltip from './custom-card-action-with-tooltip';
import CardItem from './card-item';

const Cards = () => {
	return (
		<div className="*:data-[slot=card]:bg-background grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<CardItem
				description="Gasto Total"
				title={stringUtils.formatToCurrencyBRL(5000)}
				actionChildren={
					<CustomCardActionWithTooltip
						badgeNumber={250}
						tooltipText="Valor somado após a última compra"
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
				title="R$ 600,00"
				actionChildren={
					<Badge className="text-primary/90 bg-primary/10 rounded-sm text-xs font-semibold">
						22/04/1991
					</Badge>
				}
				footerChildren={
					<>
						<span className="text-primary/75 line-clamp-1 text-xs font-medium md:text-sm">
							Realizada no Atakarejo
						</span>
						<div className="flex w-full items-center justify-between">
							<span className="text-muted-foreground text-xs">
								Rua Jurema, n° 608
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
				title="Atakarejo"
				actionChildren={<Medal color={COLORS.PRIMARY} />}
				footerChildren={
					<>
						<span className="text-primary/75 line-clamp-1 text-xs font-medium md:text-sm">
							Total gasto: {stringUtils.formatToCurrencyBRL(2000)}
						</span>
						<Tooltip>
							<TooltipTrigger asChild>
								<Link
									href=""
									className="text-primary flex items-center gap-1 text-xs underline underline-offset-2"
								>
									5 visitas registradas
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
				description="Gasto Em Julho"
				title={stringUtils.formatToCurrencyBRL(300)}
				actionChildren={
					<CustomCardActionWithTooltip
						badgeNumber={100}
						tooltipText="Última adição neste mês"
					/>
				}
				footerChildren={
					<>
						<Badge className="rounded-sm text-xs font-semibold">
							<TrendingUp />
							12%
						</Badge>

						<Tooltip>
							<TooltipTrigger>
								<Link
									href=""
									className="text-primary line-clamp-1 flex items-center gap-1 text-xs underline underline-offset-2"
								>
									em relação ao mês passado
									<ArrowUpRight size={12} />
								</Link>
							</TooltipTrigger>
							<TooltipContent side="bottom" className="shadow-lg">
								Ver compras do mês anterior
							</TooltipContent>
						</Tooltip>
					</>
				}
			/>
		</div>
	);
};

export default Cards;
