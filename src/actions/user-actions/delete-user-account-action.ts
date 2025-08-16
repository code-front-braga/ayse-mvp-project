'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const deleteUserAccountAction = async () => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;

	if (!userId) {
		return { error: 'Usuário não autenticado.' };
	}

	try {
		// Excluir o usuário e todas as suas relações (compras, produtos, etc.)
		await prisma.user.delete({
			where: { id: userId },
		});

		// Encerrar a sessão do usuário
		await auth.api.signOut({
			headers: await headers(),
		});

		return { success: true };
	} catch (error) {
		console.error('Erro ao excluir conta:', error);
		return { error: 'Erro ao excluir a conta.' };
	}
};
