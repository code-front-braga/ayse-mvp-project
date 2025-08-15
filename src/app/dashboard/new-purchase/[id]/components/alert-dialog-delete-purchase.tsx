'use client';

import { Prisma } from 'generated/prisma';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import React from 'react';
import { toast } from 'sonner';

import { deletePurchaseAction } from '@/actions/purchase-actions/delete-purchase-action';
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

import RegisterPurchaseDetails from './Register-purchase-details';

interface AlertDialogDeletePurchaseProps {
	purchase: Prisma.PurchaseGetPayload<{
		select: {
			id: true;
			supermarket: true;
			date: true;
			products: true;
			total: true;
		};
	}>;
}

const AlertDialogDeletePurchase = React.memo(
	({ purchase }: AlertDialogDeletePurchaseProps) => {
		const [isPending, startTransition] = useTransition();
		const router = useRouter();

		const handleDeletePurchase = React.useCallback(async () => {
			startTransition(async () => {
				try {
					const response = await deletePurchaseAction(purchase.id);
					if (response?.success) {
						toast.success(response.success);
						router.replace(AppRoutes.DASHBOARD_PURCHASES);
						return;
					}

					if (response?.error) {
						toast.error(response.error);
					}
				} catch (error) {
					console.error('Erro ao deletar compra:', error);
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
						<Trash2 />
						Deletar Compra
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Deletar Compra</AlertDialogTitle>
						<AlertDialogDescription className="text-start">
							Esta ação não pode ser desfeita. Isso irá deletar permanentemente
							esta compra e todos os produtos associados.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex flex-col gap-1">
						<RegisterPurchaseDetails
							label="Supermercado"
							description={purchase.supermarket}
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
							description={stringUtils.formatToCurrencyBRL(purchase.total)}
						/>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
						<AlertDialogAction asChild>
							<Button
								variant="destructive"
								onClick={handleDeletePurchase}
								disabled={isPending}
							>
								{isPending ? 'Deletando...' : 'Deletar Compra'}
							</Button>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		);
	},
);

AlertDialogDeletePurchase.displayName = 'AlertDialogDeletePurchase';

export default AlertDialogDeletePurchase;
