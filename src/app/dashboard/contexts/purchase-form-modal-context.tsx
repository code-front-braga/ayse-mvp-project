'use client';

import { createContext, ReactNode,useContext, useState } from 'react';

interface PurchaseFormModalContextType {
	isDrawerOpen: boolean;
	isAlertDialogOpen: boolean;
	setIsDrawerOpen: (isOpen: boolean) => void;
	setIsAlertDialogOpen: (isOpen: boolean) => void;
	closeAllModals: () => void;
}

const PurchaseFormModalContext = createContext<PurchaseFormModalContextType | undefined>(undefined);

interface PurchaseFormModalProviderProps {
	children: ReactNode;
}

export function PurchaseFormModalProvider({ children }: PurchaseFormModalProviderProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

	const closeAllModals = () => {
		setIsDrawerOpen(false);
		setIsAlertDialogOpen(false);
	};

	const value: PurchaseFormModalContextType = {
		isDrawerOpen,
		isAlertDialogOpen,
		setIsDrawerOpen,
		setIsAlertDialogOpen,
		closeAllModals,
	};

	return (
		<PurchaseFormModalContext.Provider value={value}>
			{children}
		</PurchaseFormModalContext.Provider>
	);
}

export function usePurchaseFormModal() {
	const context = useContext(PurchaseFormModalContext);
	if (context === undefined) {
		throw new Error('usePurchaseFormModal must be used within a PurchaseFormModalProvider');
	}
	return context;
}
