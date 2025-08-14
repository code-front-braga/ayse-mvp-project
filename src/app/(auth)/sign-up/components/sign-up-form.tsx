'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AppRoutes } from '@/enums/app-routes';
import { authClient } from '@/lib/better-auth-client';

import { SubmitButton } from '../../../components/shared/submit-button';
import { AuthLink } from '../../components/auth-link';
import { PasswordField } from '../../components/password-field';
import { PasswordStrengthIndicator } from '../../components/password-strength-indicator';
import { SignUpFormSchema, signUpSchema } from '../../schemas/auth-schemas';

export const SignUpForm = () => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const form = useForm<SignUpFormSchema>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const handleSignUp = form.handleSubmit(async (data: SignUpFormSchema) => {
		startTransition(async () => {
			await authClient.signUp.email({
				name: data.name,
				email: data.email,
				password: data.password,

				fetchOptions: {
					onSuccess: () => {
						toast.success('Conta criada! Faça login.');
						router.push(AppRoutes.SIGN_IN);
					},
					onError: ctx => {
						if (ctx.error.code === 'USER_ALREADY_EXISTS') {
							toast.error('E-mail já cadastrado');
							form.setFocus('email');
						}
					},
				},
			});
		});
	});

	return (
		<div className="w-full max-w-[400px] space-y-6 py-6">
			<Form {...form}>
				<form onSubmit={handleSignUp} className="space-y-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nome</FormLabel>
								<FormControl>
									<Input placeholder="Digite seu nome" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>E-mail</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Digite seu e-mail"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<PasswordField control={form.control} name="password" label="Senha" />

					<PasswordStrengthIndicator password={form.watch('password')} />

					<PasswordField
						control={form.control}
						name="confirmPassword"
						label="Confirmar senha"
					/>

					<SubmitButton isLoading={isPending} loadingText="Criando conta...">
						Criar conta
					</SubmitButton>
				</form>
			</Form>

			<AuthLink
				text="Já tem uma conta?"
				linkText="Faça login"
				href={AppRoutes.SIGN_IN}
			/>
		</div>
	);
};
