'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { stringUtils } from '@/helpers/string-utils';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const updateUserNameAction = async (name: string) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return { error: 'Usuário não autenticado.' };
  }

  if (!name || name.trim().length < 2) {
    return { error: 'Nome inválido.' };
  }

  try {
    const formattedName = stringUtils.toTitleCase(name.trim());

    await prisma.user.update({
      where: { id: userId },
      data: { name: formattedName },
    });

    revalidatePath(AppRoutes.DASHBOARD_SETTINGS);
    revalidatePath(AppRoutes.DASHBOARD_OVERVIEW);

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar nome:', error);
    return { error: 'Erro ao atualizar o nome.' };
  }
};
