'use server';

import { Prisma, PurchaseStatus } from 'generated/prisma';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/client';

import { CreatePurchaseSchema } from '../schemas/purchase-schema';

export const createPurchaseAction = async (data: CreatePurchaseSchema) => {
	try {
		const session = await auth.api.getSession({ headers: await headers() });
		const userId = session?.user?.id;
		if (!userId) return { error: 'Usuário não encontrado.' };

		const { supermarket, address, date } = data;

		const total = 0;

		const purchase = await prisma.purchase.create({
			data: {
				userId,
				supermarket,
				address,
				date,
				total,
				status: PurchaseStatus.IN_PROCESS,
			},
			select: { id: true },
		});

		return {
			success: 'Compra criada com sucesso! Comece a adicionar produtos.',
			id: purchase.id,
		};
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			if (error.code === 'P2002') {
				return { error: 'Já existe uma compra em andamento.' };
			}
		}

		console.error('Erro ao criar compra:', error);
		return { error: 'Erro interno do servidor. Tente novamente.' };
	}
};
