'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { useCallback, useMemo } from 'react';

interface AddProductModalContextType {
	isDrawerOpen: boolean;
	isSheetOpen: boolean;
	setIsDrawerOpen: (isOpen: boolean) => void;
	setIsSheetOpen: (isOpen: boolean) => void;
	closeAllModals: () => void;
}

const AddProductModalContext = createContext<
	AddProductModalContextType | undefined
>(undefined);

interface AddProductModalProviderProps {
	children: ReactNode;
}

export function AddProductModalProvider({
	children,
}: AddProductModalProviderProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);

	const closeAllModals = useCallback(() => {
		setIsDrawerOpen(false);
		setIsSheetOpen(false);
	}, []);

	const value: AddProductModalContextType = useMemo(
		() => ({
			isDrawerOpen,
			isSheetOpen,
			setIsDrawerOpen,
			setIsSheetOpen,
			closeAllModals,
		}),
		[isDrawerOpen, isSheetOpen, closeAllModals],
	);

	return (
		<AddProductModalContext.Provider value={value}>
			{children}
		</AddProductModalContext.Provider>
	);
}

export function useAddProductModal() {
	const context = useContext(AddProductModalContext);
	if (context === undefined) {
		throw new Error(
			'useAddProductModal must be used within a AddProductModalProvider',
		);
	}
	return context;
}
