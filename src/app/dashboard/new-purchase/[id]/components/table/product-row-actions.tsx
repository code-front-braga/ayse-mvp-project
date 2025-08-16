'use client';

import { Ellipsis, PenLine, Text, Trash, TriangleAlert } from 'lucide-react';
import { useState, useTransition } from 'react';
import React from 'react';
import { toast } from 'sonner';

import { deleteProductAction } from '@/actions/product-actions/delete-product-action';
import { EditProductActionProps } from '@/actions/product-actions/edit-product-action';
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
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { COLORS } from '@/enums/colors';
import { useOptimisticProducts } from '@/hooks/use-optimistic-products';

import ProductForm from '../product-form';

export type ProductRowActionsProps = {
	product: EditProductActionProps;
};

const ProductRowActions = React.memo(({ product }: ProductRowActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [showEditSheet, setShowEditSheet] = useState(false);
	const [isUpdatePending, startUpdateTransition] = useTransition();
	const { addOptimisticProduct } = useOptimisticProducts();

	const handleDelete = () => {
		startUpdateTransition(async () => {
			try {
				addOptimisticProduct({
					type: 'delete',
					productId: product.id,
				});
				const response = await deleteProductAction({ id: product.id });

				if (response?.success) {
					toast.success(response.success);
					setShowDeleteDialog(false);
					return;
				}

				if (response?.error) {
					toast.error(response.error);
					return;
				}
			} catch (error) {
				console.error(error);
			}
		});
	};

	const handleEditSubmit = () => {
		setShowEditSheet(false);
	};

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
					<DropdownMenuItem
						onClick={() => setShowEditSheet(true)}
						variant="default"
						className="text-primary"
					>
						<PenLine color={COLORS.PRIMARY} />
						Editar
					</DropdownMenuItem>
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
								permanentemente este produto
							</AlertDialogDescription>
						</AlertDialogHeader>
					</div>
					<AlertDialogFooter>
						<AlertDialogCancel disabled={isUpdatePending}>
							Cancelar
						</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDelete}
							disabled={isUpdatePending}
							className="bg-destructive hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-white shadow-xs"
						>
							Deletar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>

			<Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Editar produto</SheetTitle>
					</SheetHeader>

					<div className="h-full px-4 pb-4">
						<ProductForm
							actionMode="edit"
							productId={product.id}
							initialData={{ ...product }}
							onSuccess={handleEditSubmit}
						/>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
});

export default ProductRowActions;
