'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { COLORS } from '@/app/enums/colors';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/kibo-ui/spinner';
import { toLowerCase } from '@/helpers/to-lower-case';

import { AuthLink } from '../../components';
import { ZodErrors } from '../../enums/zod-errors';

const signInFormSchema = z.object({
	email: z
		.email({ error: ZodErrors.INVALID_EMAIL })
		.min(1, { error: ZodErrors.EMAIL_IS_REQUIRED })
		.trim()
		.transform(toLowerCase),
	password: z
		.string()
		.min(1, { error: ZodErrors.PASSWORD_IS_REQUIRED })
		.min(6, { error: ZodErrors.PASSWORD_MIN_CHARACTERS }),
});

export type SignInFormValues = z.infer<typeof signInFormSchema>;

export const SignInForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const form = useForm<SignInFormValues>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = async (data: SignInFormValues) => {
		startTransition(async () => {
			console.log('Dados do formulário:', data);
		});
	};

	const passwordInputType = showPassword ? 'text' : 'password';

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev);
	};

	return (
		<div className="w-full max-w-[400px] space-y-6 py-6">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="seu@email.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Senha</FormLabel>
								<div className="relative">
									<FormControl>
										<Input
											type={passwordInputType}
											placeholder="••••••"
											{...field}
										/>
									</FormControl>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="absolute top-0 right-0"
										onClick={togglePasswordVisibility}
									>
										{showPassword ? (
											<EyeOff color={COLORS.PRIMARY} />
										) : (
											<Eye color={COLORS.PRIMARY} />
										)}
										<span className="sr-only">
											{showPassword ? 'Esconder senha' : 'Mostrar senha'}
										</span>
									</Button>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? (
							<>
								<Spinner variant="bars" className="mr-2 animate-spin" />
								Processando...
							</>
						) : (
							'Entrar'
						)}
					</Button>
				</form>
			</Form>

			<AuthLink
				href="/sign-up"
				text="Não tem uma conta?"
				linkText="Cadastre-se"
			/>
		</div>
	);
};
