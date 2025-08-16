'use client';

import { Prisma } from 'generated/prisma';
import { Ban } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import React from 'react';
import { toast } from 'sonner';

import { cancelPurchaseAction } from '@/actions/purchase-actions/cancel-purchase-action';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AppRoutes } from '@/enums/app-routes';
import { stringUtils } from '@/helpers/string-utils';

import RegisterPurchaseDetails from './register-purchase-details';

interface AlertDialogCancelPurchaseProps {
	purchase: Prisma.PurchaseGetPayload<{
		select: {
			id: true;
			supermarket: true;
			address: true;
			date: true;
			products: true;
			total: true;
		};
	}>;
}

const AlertDialogCancelPurchase = React.memo(
	({ purchase }: AlertDialogCancelPurchaseProps) => {
		const [isPending, startTransition] = useTransition();
		const router = useRouter();

		const handleCancelPurchase = React.useCallback(async () => {
			startTransition(async () => {
				try {
					const response = await cancelPurchaseAction(purchase.id);
					if (response?.success) {
						toast.success(response.success);
						router.replace(AppRoutes.DASHBOARD_PURCHASES);
						return;
					}

					if (response?.error) {
						toast.error(response.error);
					}
				} catch (error) {
					console.error('Erro ao cancelar compra:', error);
					toast.error('Erro inesperado. Tente novamente.');
				}
			});
		}, [purchase.id, router]);

		return (
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button
						variant="destructive"
						className="w-full disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-600 md:w-fit"
					>
						<Ban />
						Cancelar Compra
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Cancelar Compra</AlertDialogTitle>
						<AlertDialogDescription className="text-start">
							Esta ação não pode ser desfeita. Isso irá cancelar esta compra e
							você não poderá mais editá-la.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex flex-col gap-1">
						<RegisterPurchaseDetails
							label="Supermercado"
							description={purchase.supermarket}
						/>
						<RegisterPurchaseDetails
							label="Endereço"
							description={purchase.address || ''}
						/>

						<RegisterPurchaseDetails
							label="Data da compra"
							description={stringUtils.formatDateToBRL(purchase.date)}
						/>
						<RegisterPurchaseDetails
							label="Qtd. de produtos"
							description={stringUtils.padWithZero(purchase.products.length)}
						/>
						<RegisterPurchaseDetails
							label="Total"
							description={
								stringUtils.formatToCurrencyBRL(purchase.total) || 'R$ 0,00'
							}
						/>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isPending}>Voltar</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button
								variant="destructive"
								onClick={handleCancelPurchase}
								disabled={isPending}
							>
								{isPending ? 'Cancelando...' : 'Cancelar Compra'}
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);

export default AlertDialogCancelPurchase;
