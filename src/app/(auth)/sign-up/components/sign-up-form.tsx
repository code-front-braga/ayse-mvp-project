'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

import { AuthLink } from '../../components';
import { PasswordField } from '../../components/password-field';
import { PasswordStrengthBar } from '../../components/password-strength-bar';
import { SubmitButton } from '../../components/submit-button';
import { useAuthOperations } from '../../hooks/use-auth-operations';
import { signUpFormSchema, SignUpFormValues } from '../../schemas/auth-schemas';

export const SignUpForm = () => {
	const { isPending, signUp } = useAuthOperations();

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmit = (data: SignUpFormValues) => {
		signUp(data, form.setError);
	};

	return (
		<div className="w-full max-w-[400px] space-y-6 py-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

					<PasswordStrengthBar password={form.watch('password')} />

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
