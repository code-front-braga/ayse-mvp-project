'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

import { CreatePurchaseSchema } from './purchase-schema';

export const createPurchaseAction = async (data: CreatePurchaseSchema) => {
	const session = await auth.api.getSession({ headers: await headers() });
	if (!session?.user?.id) {
		return { error: 'Usuário não autenticado.' };
	}

	try {
		const purchase = await prisma.purchase.create({
			data: {
				supermarket: data.supermarket,
				address: data.address,
				date: data.date,
				total: 0,
				userId: session.user.id,
			},
		});

		revalidatePath(AppRoutes.DASHBOARD_NEW_PURCHASE);
    
		return { success: true, purchaseId: purchase.id };
	} catch (error) {
		console.error('Erro ao criar compra:', error);
		return { error: 'Erro interno do servidor.' };
	}
};
