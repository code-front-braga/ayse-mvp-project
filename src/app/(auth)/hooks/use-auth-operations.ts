'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { UseFormSetError } from 'react-hook-form';
import { toast } from 'sonner';

import { AppRoutes } from '@/enums/app-routes';
import { authClient } from '@/lib/auth-client';

import { SignInFormValues, SignUpFormValues } from '../schemas';

export const useAuthOperations = () => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const signUp = async (
		data: SignUpFormValues,
		setError: UseFormSetError<SignUpFormValues>,
	) => {
		startTransition(async () => {
			await authClient.signUp.email({
				name: data.name,
				email: data.email,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						toast.success('Cadastro realizado com sucesso!');
						router.push(AppRoutes.SIGN_IN);
					},
					onError: ctx => {
						if (ctx.error.code === 'USER_ALREADY_EXISTS') {
							toast.error('E-mail já cadastrado. Tente outro.');
							return setError('email', {
								message: 'E-mail já cadastrado. Tente outro.',
							});
						}
						toast.error(ctx.error.message);
					},
				},
			});
		});
	};

	const signIn = async (
		data: SignInFormValues,
		setError: UseFormSetError<SignInFormValues>,
	) => {
		startTransition(async () => {
			await authClient.signIn.email({
				email: data.email,
				password: data.password,
				fetchOptions: {
					onSuccess: () => {
						router.push(AppRoutes.DASHBOARD_OVERVIEW);
					},
					onError: ctx => {
						if (ctx.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
							toast.error('E-mail ou senha inválidos.');
							setError('password', {
								message: 'E-mail ou senha inválidos.',
							});
							return setError('email', {
								message: 'E-mail ou senha inválidos.',
							});
						}
						toast.error(ctx.error.message);
					},
				},
			});
		});
	};

	const signInWithGoogle = async () => {
		await authClient.signIn.social({
			provider: 'google',
			callbackURL: AppRoutes.DASHBOARD_OVERVIEW,
		});
	};

	return {
		isPending,
		signUp,
		signIn,
		signInWithGoogle,
	} as const;
};
