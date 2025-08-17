'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';

export const signOutAction = async () => {
	try {
		await auth.api.signOut({
			headers: await headers(),
		});

		return { success: true };
	} catch (error) {
		console.error('Erro ao fazer logout:', error);
		return { error: 'Erro ao fazer logout.' };
	}
};
