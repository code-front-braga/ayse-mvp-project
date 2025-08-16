'use server';

import { BetterAuthError } from 'better-auth';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

interface UpdatePasswordParams {
	currentPassword: string;
	newPassword: string;
}

export const updateUserPasswordAction = async ({
	currentPassword,
	newPassword,
}: UpdatePasswordParams) => {
	const session = await auth.api.getSession({ headers: await headers() });
	const userId = session?.user?.id;

	if (!userId) {
		return { error: 'Usuário não autenticado.' };
	}

	try {
		// Verificar senha atual usando Better-auth
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { email: true },
		});

		if (!user) {
			return { error: 'Usuário não encontrado.' };
		}

		await auth.api.changePassword({
			body: {
				newPassword,
				currentPassword,
				revokeOtherSessions: true,
			},

			headers: await headers(),
		});

		revalidatePath(AppRoutes.DASHBOARD_SETTINGS);

		return { success: true };
	} catch (error) {
		if (error instanceof BetterAuthError) {
			if (error.message === 'INVALID_PASSWORD') {
				return { error: 'Senha atual incorreta.' };
			}
			return { error: 'Erro ao atualizar a senha.' };
		}
	}
};
