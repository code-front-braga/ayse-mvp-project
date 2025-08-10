'use server';

import { Prisma, PurchaseStatus } from 'generated/prisma';
import { headers } from 'next/headers';

import { stringUtils } from '@/helpers/string-utils';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/client';

import { CreatePurchaseSchema } from '../schemas/purchase-schema';

export const createPurchaseAction = async (data: CreatePurchaseSchema) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não encontrado.' };
	try {
		const formattedSupermarketName = stringUtils.toTitleCase(data.supermarket);
		const formattedAddress = stringUtils.toTitleCase(data.address);

		const purchase = await prisma.purchase.create({
			data: {
				userId,
				address: formattedAddress,
				supermarket: formattedSupermarketName,
				date: new Date(data.date),
				total: 0,
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
