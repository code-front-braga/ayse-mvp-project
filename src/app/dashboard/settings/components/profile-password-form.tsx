'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateUserPasswordAction } from '@/actions/user-actions/update-user-password-action';
import { PasswordField } from '@/app/(auth)/components/password-field';
import { PasswordStrengthIndicator } from '@/app/(auth)/components/password-strength-indicator';
import {
	LOWER_CASE_REGEX,
	NUMBER_REGEX,
	SPECIAL_CHARACTER_REGEX,
	UPPER_CASE_REGEX,
} from '@/app/(auth)/constants/regex';
import { SubmitButton } from '@/app/components/shared/submit-button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Form } from '@/components/ui/form';

const formSchema = z
	.object({
		currentPassword: z.string().min(1, 'A senha atual é obrigatória'),
		newPassword: z
			.string()
			.min(8, 'A senha deve ter pelo menos 8 caracteres')
			.regex(
				UPPER_CASE_REGEX,
				'A senha deve conter pelo menos uma letra maiúscula',
			)
			.regex(
				LOWER_CASE_REGEX,
				'A senha deve conter pelo menos uma letra minúscula',
			)
			.regex(NUMBER_REGEX, 'A senha deve conter pelo menos um número')
			.regex(
				SPECIAL_CHARACTER_REGEX,
				'A senha deve conter pelo menos um caractere especial',
			),
		confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória'),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'As senhas não coincidem',
		path: ['confirmPassword'],
	});

type FormValues = z.infer<typeof formSchema>;

export default function ProfilePasswordForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	});

	function onSubmit(data: FormValues) {
		startTransition(async () => {
			try {
				const result = await updateUserPasswordAction({
					currentPassword: data.currentPassword,
					newPassword: data.newPassword,
				});

				if (result?.success) {
					toast.success('Senha atualizada com sucesso!');
					form.reset();
					return;
				}

				if (result?.error) {
					toast.error(result.error);
					return;
				}
			} catch (error) {
				toast.error('Erro ao atualizar a senha.');
				console.error('Erro ao atualizar a senha:', error);
			}
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Senha</CardTitle>
				<CardDescription>
					Atualize sua senha para manter sua conta segura.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<PasswordField
							control={form.control}
							name="currentPassword"
							label="Senha atual"
						/>

						<PasswordField
							control={form.control}
							name="newPassword"
							label="Nova senha"
						/>

						<PasswordStrengthIndicator password={form.watch('newPassword')} />

						<PasswordField
							control={form.control}
							name="confirmPassword"
							label="Confirmar nova senha"
						/>

						<div className="flex justify-end">
							<SubmitButton isLoading={isPending} loadingText="Atualizando...">
								Atualizar senha
							</SubmitButton>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
