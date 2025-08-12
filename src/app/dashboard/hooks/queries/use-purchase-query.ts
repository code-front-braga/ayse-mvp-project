import { useQuery } from '@tanstack/react-query';

import { getPurchaseAction } from '@/app/dashboard/actions/purchase-actions';

export const getPurchaseQueryKey = () => ['purchase'] as const;

export const usePurchaseQuery = () => {
	return useQuery({
		queryKey: getPurchaseQueryKey(),
		queryFn: () => getPurchaseAction(),
	});
};
