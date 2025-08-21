'use client';

import { Purchase } from 'generated/prisma';
import { TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';
import { toast } from 'sonner';

import { permanentDeletePurchaseAction } from '@/actions/purchase-actions/permanent-delete-purchase-action';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
	AlertDialogFooter,
	AlertDialogHeader,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AppRoutes } from '@/enums/app-routes';
import { cn } from '@/lib/utils';

interface CardActionsProps {
	purchase: Pick<Purchase, 'id' | 'status'>;
}

const CardActions = ({ purchase }: CardActionsProps) => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const isCancelled = purchase.status === 'CANCELLED';

	const handleDeletePurchase = useCallback(async () => {
		startTransition(async () => {
			const response = await permanentDeletePurchaseAction(purchase.id);

			if (response.success) {
				toast.success(response.success);
				router.replace(AppRoutes.DASHBOARD_PURCHASES);
				return;
			}

			toast.error(response.error);
		});
	}, [purchase.id, router, startTransition]);

	return (
		<>
			<Card className="h-full w-full flex-1">
				<CardHeader>
					<CardTitle>O que deseja fazer?</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mt-4 flex flex-col space-y-2">
						<Button
							variant="outline"
							disabled={true}
							className={cn('w-full text-xs lg:text-sm', {
								'cursor-not-allowed bg-gray-100': isCancelled,
							})}
						>
							Exportar PDF
						</Button>
						<Button
							onClick={() => setShowDeleteDialog(true)}
							variant="destructive"
							disabled={isPending}
							className="w-full text-xs lg:text-sm"
						>
							Deletar Compra
						</Button>
					</div>
				</CardContent>
			</Card>

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
								Esta ação não poderá ser desfeita. Isso irá excluir
								permanentemente esta compra e todos os seus produtos.
							</AlertDialogDescription>
						</AlertDialogHeader>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeletePurchase}
							disabled={isPending}
							className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white shadow-xs"
						>
							Excluir Permanentemente
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default CardActions;
