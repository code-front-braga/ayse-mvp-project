'use client';

import { Prisma } from 'generated/prisma';
import { PackageCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import React from 'react';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { registerPurchaseAction } from '@/actions/purchase-actions/register-purchase-action';
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

interface AlertDialogRegisterPurchaseProps {
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

const AlertDialogRegisterPurchase = ({
	purchase,
}: AlertDialogRegisterPurchaseProps) => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const hasProducts = useMemo(
		() => purchase.products && purchase.products.length > 0,
		[purchase],
	);

	const handleRegisterPurchase = async () => {
		startTransition(async () => {
			try {
				const response = await registerPurchaseAction(purchase.id);
				if (response?.success) {
					toast.success(response.success);
					router.replace(AppRoutes.DASHBOARD_PURCHASES);
					return;
				}

				if (response?.error) {
					toast.error(response.error);
				}
			} catch (error) {
				console.error('Erro ao registrar compra:', error);
				toast.error('Erro inesperado. Tente novamente.');
			}
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					variant="outline"
					className="w-full bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-600 md:w-fit"
					disabled={!hasProducts}
				>
					<PackageCheck />
					Registrar Compra
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Registrar Compra</AlertDialogTitle>
					<AlertDialogDescription className="text-start">
						Confirme os dados da compra e registre-a no sistema.
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
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Button onClick={handleRegisterPurchase} disabled={isPending}>
							{isPending ? 'Processando...' : 'Registrar Compra'}
						</Button>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default AlertDialogRegisterPurchase;
