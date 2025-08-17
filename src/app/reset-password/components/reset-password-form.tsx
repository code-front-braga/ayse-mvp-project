'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { resetPasswordAction } from '@/actions/user-actions/reset-password-action';
import { PasswordField } from '@/app/(auth)/components/password-field';
import { PasswordStrengthIndicator } from '@/app/(auth)/components/password-strength-indicator';
import {
	ResetPasswordFormSchema,
	resetPasswordSchema,
} from '@/app/(auth)/schemas/forgot-password-schema';
import { SubmitButton } from '@/app/components/shared/submit-button';
import { Form } from '@/components/ui/form';
import { AppRoutes } from '@/enums/app-routes';

interface ResetPasswordFormProps {
	token?: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
	const [isPending, startTransition] = useTransition();
	const [resetComplete, setResetComplete] = useState(false);
	const router = useRouter();

	const form = useForm<ResetPasswordFormSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			confirmPassword: '',
		},
	});

	if (!token) {
		return (
			<div className="bg-card rounded-lg border p-6 shadow-sm">
				<div className="space-y-4 text-center">
					<h2 className="text-destructive text-xl font-semibold">
						Link Inválido
					</h2>
					<p className="text-muted-foreground">
						O link de redefinição de senha é inválido ou expirou. Por favor,
						solicite um novo link de recuperação de senha.
					</p>
					<div className="pt-4">
						<Link
							href={AppRoutes.FORGOT_PASSWORD}
							className="text-primary hover:underline"
						>
							Solicitar novo link
						</Link>
					</div>
				</div>
			</div>
		);
	}

	const handleSubmit = form.handleSubmit(async data => {
		startTransition(async () => {
			const result = await resetPasswordAction(token, data.password);

			if (result.error) {
				toast.error(result.error);
				return;
			}

			setResetComplete(true);
			toast.success('Senha redefinida com sucesso!');

			// Redirecionar para a página de login após 3 segundos
			setTimeout(() => {
				router.push(AppRoutes.SIGN_IN);
			}, 3000);
		});
	});

	if (resetComplete) {
		return (
			<div className="bg-card rounded-lg border p-6 shadow-sm">
				<div className="space-y-4 text-center">
					<h2 className="text-xl font-semibold text-green-600">
						Senha Redefinida
					</h2>
					<p className="text-muted-foreground">
						Sua senha foi redefinida com sucesso. Você será redirecionado para a
						página de login em instantes.
					</p>
					<div className="pt-4">
						<Link
							href={AppRoutes.SIGN_IN}
							className="text-primary hover:underline"
						>
							Ir para o login
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-card rounded-lg border p-6 shadow-sm">
			<Form {...form}>
				<form onSubmit={handleSubmit} className="space-y-4">
					<PasswordField
						control={form.control}
						name="password"
						label="Nova senha"
					/>

					<PasswordStrengthIndicator password={form.watch('password')} />

					<PasswordField
						control={form.control}
						name="confirmPassword"
						label="Confirmar nova senha"
					/>

					<SubmitButton isLoading={isPending} loadingText="Redefinindo...">
						Redefinir senha
					</SubmitButton>

					<div className="mt-4 text-center text-sm">
						<Link
							href={AppRoutes.SIGN_IN}
							className="text-primary hover:underline"
						>
							Voltar para o login
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
}
