import { useMutation } from '@tanstack/react-query';

import { addProductAction } from '../../actions/product-actions';
import { AddProductSchema } from '../../new-purchase/[id]/schemas/product-schema';
import { queryClient } from '../../providers/query-client-provider';
import { getPurchaseQueryKey } from '../queries/use-purchase-query';

export const getAddProductMutationKey = (purchaseId: string) =>
	['add-product', purchaseId] as const;

export const useAddProductMutation = (purchaseId: string) => {
	return useMutation({
		mutationKey: getAddProductMutationKey(purchaseId),
		mutationFn: (data: AddProductSchema) =>
			addProductAction({ ...data, purchaseId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: getPurchaseQueryKey() });
		},
	});
};
