'use client';

import { createContext, ReactNode,useContext, useOptimistic } from 'react';

export type ProductType = {
	id?: string;
	name: string;
	category: string;
	price: number;
	quantity: number;
	total: number;
	description?: string;
	purchaseId?: string;
};

export type OptimisticAction =
	| { type: 'add'; product: ProductType }
	| { type: 'update'; product: ProductType }
	| { type: 'delete'; productId: string }
	| { type: 'delete_multiple'; productIds: string[] };

interface OptimisticContextType {
	optimisticProducts: ProductType[];
	addOptimisticProduct: (action: OptimisticAction) => void;
}

const OptimisticContext = createContext<OptimisticContextType | null>(null);

interface OptimisticProviderProps {
	children: ReactNode;
	initialProducts: ProductType[];
}

export const OptimisticProvider = ({ children, initialProducts }: OptimisticProviderProps) => {
	const [optimisticProducts, addOptimisticProduct] = useOptimistic(
		initialProducts,
		(state: ProductType[], action: OptimisticAction) => {
			switch (action.type) {
				case 'add':
					return [...state, { ...action.product, id: action.product.id || crypto.randomUUID() }];

				case 'update':
					return state.map(product =>
						product.id === action.product.id ? { ...product, ...action.product } : product
					);

				case 'delete':
					return state.filter(product => product.id !== action.productId);

				case 'delete_multiple':
					return state.filter(product => !action.productIds.includes(product.id!));

				default:
					return state;
			}
		}
	);

	return (
		<OptimisticContext.Provider value={{ optimisticProducts, addOptimisticProduct }}>
			{children}
		</OptimisticContext.Provider>
	);
};

export const useOptimisticProducts = () => {
	const context = useContext(OptimisticContext);
	if (!context) {
		throw new Error('useOptimisticProducts deve ser usado dentro de um OptimisticProvider');
	}
	return context;
};
