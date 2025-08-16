'use client';

import { Plus } from 'lucide-react';

import { useAddProductModal } from '@/app/dashboard/contexts/add-product-modal-context';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

import ProductForm from './product-form';

const SheetDrawerAddProduct = () => {
	const isMobile = useIsMobile();
	const { isDrawerOpen, setIsDrawerOpen, isSheetOpen, setIsSheetOpen } =
		useAddProductModal();

	if (isMobile) {
		return (
			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerTrigger asChild className="w-full">
					<Button onClick={() => setIsDrawerOpen(true)} variant="outline">
						<Plus />
						Adicionar Produto
					</Button>
				</DrawerTrigger>
				<DrawerContent className="min-h-dvh">
					<DrawerHeader>
						<DrawerTitle>Adicionar Produto</DrawerTitle>

						<DrawerDescription>
							Adicione um produto à sua compra.
						</DrawerDescription>
					</DrawerHeader>
					<div className="h-screen px-4 pb-4">
						<ProductForm actionMode="add" />
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
			<SheetTrigger asChild>
				<Button onClick={() => setIsSheetOpen(true)} variant="outline">
					<Plus />
					Adicionar Produto
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Adicionar Produto</SheetTitle>
				</SheetHeader>

				<div className="h-screen px-4 pb-4">
					<ProductForm actionMode="add" />
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default SheetDrawerAddProduct;
