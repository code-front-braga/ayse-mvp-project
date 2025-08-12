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

export const updatePurchaseTotalAction = async (purchaseId: string) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não encontrado.' };

	const purchase = await prisma.purchase.findFirst({
		where: { 
			id: purchaseId,
			userId 
		},
		include: { products: true },
	});

	if (!purchase) return { error: 'Compra não encontrada.' };

	// Calcular o total baseado nos produtos
	const calculatedTotal = purchase.products.reduce(
		(acc, product) => acc + product.price * product.quantity,
		0,
	);

	// Atualizar o total no banco de dados
	await prisma.purchase.update({
		where: { id: purchaseId },
		data: { total: calculatedTotal },
	});

	return { success: 'Total atualizado com sucesso.', total: calculatedTotal };
};

export const getPurchaseByIdAction = async (purchaseId: string) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não encontrado.' };

	const purchase = await prisma.purchase.findFirst({
		where: { 
			id: purchaseId,
			userId 
		},
		include: { products: true },
	});

	if (!purchase) return { error: 'Compra não encontrada.' };

	return purchase;
};

export const getPurchaseAction = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não encontrado.' };

	const purchase = await prisma.purchase.findFirst({
		where: { userId },
		include: { products: true },
	});

	if (!purchase) return { error: 'Compra não encontrada.' };

	return purchase;
};

export const getAllPurchasesAction = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;
	if (!userId) return { error: 'Usuário não encontrado.' };

	const purchases = await prisma.purchase.findMany({
		where: { userId },
		include: { products: true },
		orderBy: { date: 'desc' },
	});

	return purchases;
};
