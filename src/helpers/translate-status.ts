export const statusTranslations = {
	IN_PROCESS: 'Em Processo',
	CANCELLED: 'Cancelado',
	COMPLETED: 'Finalizado',
} as const;

export type PurchaseStatus = keyof typeof statusTranslations;

export const translateStatus = (status: PurchaseStatus): string => {
	return statusTranslations[status] || status;
};
