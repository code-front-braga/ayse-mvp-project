'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';

export const resetPasswordAction = async (token: string, password: string) => {
  try {
    // Verificar se o token é válido e redefinir a senha
    await auth.api.resetPassword({
      body: {
        token,
        newPassword: password,
      },
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    return { error: 'Token inválido ou expirado. Por favor, solicite uma nova redefinição de senha.' };
  }
};
