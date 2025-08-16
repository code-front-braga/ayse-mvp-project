'use client';

import { Ellipsis, PenLine, Text, Trash, TriangleAlert } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { deletePurchaseAction } from '@/actions/purchase-actions/delete-purchase-action';
import { PurchaseType } from '@/app/dashboard/overview/components/table/supermarket-columns';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppRoutes } from '@/enums/app-routes';
import { COLORS } from '@/enums/colors';

const PurchaseRowActions = React.memo(
	({ purchase }: { purchase: PurchaseType }) => {
		const [showDeleteDialog, setShowDeleteDialog] = useState(false);
		const [isPending, startTransition] = useTransition();

		const router = useRouter();
		const isNotCompletedPurchase = purchase.status !== 'COMPLETED';

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
			<>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className="flex justify-end">
							<Button
								size="icon"
								variant="ghost"
								className="text-muted-foreground/60 shadow-none"
								aria-label="Edit item"
							>
								<Ellipsis
									size={20}
									color={COLORS.PRIMARY}
									aria-hidden="true"
									className="size-5"
								/>
							</Button>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-auto">
						{isNotCompletedPurchase && (
							<DropdownMenuItem
								asChild
								variant="default"
								className="text-primary"
							>
								<Link
									href={`${AppRoutes.DASHBOARD_NEW_PURCHASE}/${purchase.id}`}
									prefetch={true}
								>
									<PenLine color={COLORS.PRIMARY} />
									Continuar
								</Link>
							</DropdownMenuItem>
						)}

						<DropdownMenuItem>
							<Text />
							Ver Detalhes
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => setShowDeleteDialog(true)}
							variant="destructive"
						>
							<Trash />
							Deletar
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
					<AlertDialogContent>
						<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
							<div
								className="border-border flex size-9 shrink-0 items-center justify-center rounded-full border"
								aria-hidden="true"
							>
								<TriangleAlert className="opacity-80" size={16} />
							</div>
							<AlertDialogHeader>
								<AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
								<AlertDialogDescription>
									Esta ação não poderá ser desfeita. Isso irá deletar
									permanentemente esta compra
								</AlertDialogDescription>
							</AlertDialogHeader>
						</div>
						<AlertDialogFooter>
							<AlertDialogCancel disabled={isPending}>
								Cancelar
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDeletePurchase}
								disabled={isPending}
								className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white shadow-xs"
							>
								Deletar
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</>
		);
	},
);

export default PurchaseRowActions;
