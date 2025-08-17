'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { AppRoutes } from '@/enums/app-routes';
import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const updateUserImageAction = async (imageUrl: string | null) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) {
    return { error: 'Usuário não autenticado.' };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });

    revalidatePath(AppRoutes.DASHBOARD_SETTINGS);
    revalidatePath(AppRoutes.DASHBOARD_OVERVIEW);

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar imagem:', error);
    return { error: 'Erro ao atualizar a imagem.' };
  }
};
