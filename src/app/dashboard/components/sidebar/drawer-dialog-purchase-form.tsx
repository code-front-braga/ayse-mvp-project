'use client';

import { Plus } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

import { usePurchaseFormModal } from '../../contexts/purchase-form-modal-context';
import CreatePurchaseForm from './create-purchase-form';

interface DrawerDialogPurchaseFormProps {
	setIsSidebarOpen?: (isOpen: boolean) => void;
}

const DrawerDialogPurchaseForm = ({
	setIsSidebarOpen,
}: DrawerDialogPurchaseFormProps) => {
	const {
		isDrawerOpen,
		isAlertDialogOpen,
		setIsDrawerOpen,
		setIsAlertDialogOpen,
	} = usePurchaseFormModal();
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerTrigger asChild>
					<SidebarMenuButton
						onClick={() => setIsDrawerOpen(true)}
						tooltip="Cadastrar compra"
						className="text-primary-foreground hover:text-primary-foreground active:text-primary-foreground min-w-8 bg-gray-800 duration-200 ease-linear hover:bg-gray-700 active:bg-gray-800"
					>
						<Plus />
						<span>Cadastrar compra</span>
					</SidebarMenuButton>
				</DrawerTrigger>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Cadastrar Compra</DrawerTitle>
						<DrawerDescription>
							Cadastre uma nova compra no sistema.
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<CreatePurchaseForm setIsSidebarOpen={setIsSidebarOpen} />
						<DrawerClose asChild>
							<Button variant="outline" className="w-full">
								Cancelar
							</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
			<AlertDialogTrigger asChild>
				<SidebarMenuButton
					onClick={() => setIsAlertDialogOpen(true)}
					tooltip="Cadastrar compra"
					className="text-primary-foreground hover:text-primary-foreground active:text-primary-foreground min-w-8 bg-gray-800 duration-200 ease-linear hover:bg-gray-700 active:bg-gray-800"
				>
					<Plus />
					<span>Cadastrar compra</span>
				</SidebarMenuButton>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Cadastrar Compra</AlertDialogTitle>
					<AlertDialogDescription>
						Cadastre uma nova compra no sistema.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<CreatePurchaseForm setIsSidebarOpen={setIsSidebarOpen} />
				<AlertDialogFooter>
					<AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DrawerDialogPurchaseForm;
