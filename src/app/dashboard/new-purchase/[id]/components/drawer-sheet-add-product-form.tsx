'use client';

import { Plus } from 'lucide-react';

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
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

import { useAddProductModal } from '../../../contexts/add-product-modal-context';
import AddProductForm from './add-product-form';

interface DrawerDialogPurchaseFormProps {
	setIsSidebarOpen?: (isOpen: boolean) => void;
}

const DrawerSheetAddProductForm = ({
	setIsSidebarOpen,
}: DrawerDialogPurchaseFormProps) => {
	const { isDrawerOpen, isSheetOpen, setIsDrawerOpen, setIsSheetOpen } =
		useAddProductModal();
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerTrigger asChild>
					<Button onClick={() => setIsDrawerOpen(true)} variant="outline">
						<Plus />
						<span>Adicionar produto</span>
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Adicionar Produto</DrawerTitle>
						<DrawerDescription>
							Adicione um novo produto à compra.
						</DrawerDescription>
					</DrawerHeader>
					<div className="h-full px-4">
						<AddProductForm setIsSidebarOpen={setIsSidebarOpen} />
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
					<span>Adicionar produto</span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Adicionar Produto</SheetTitle>
					<SheetDescription>
						Adicione um novo produto à compra.
					</SheetDescription>
				</SheetHeader>
				<div className="h-full px-4">
					<AddProductForm setIsSidebarOpen={setIsSheetOpen} />
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default DrawerSheetAddProductForm;
