'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { AppRoutes } from '@/app/enums/app-routes';
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
import { toTitleCase } from '@/helpers/to-title-case';

import { AuthLink } from '../../components';
import { PasswordStrengthBar } from '../../components/password-strength-bar';
import {
	LOWER_CASE_REGEX,
	NUMBER_REGEX,
	SPECIAL_CHARACTER_REGEX,
	UPPER_CASE_REGEX,
} from '../../constants/regex';
import { ZodErrors } from '../../enums/zod-errors';

const signUpFormSchema = z
	.object({
		name: z
			.string()
			.min(6, { error: ZodErrors.NAME_IS_REQUIRED })
			.max(30, { error: ZodErrors.NAME_MAX_CHARACTERS })
			.trim()
			.transform(toTitleCase),

		email: z
			.email({ error: ZodErrors.INVALID_EMAIL })
			.min(1, { error: ZodErrors.EMAIL_IS_REQUIRED })
			.trim()
			.transform(toLowerCase),

		password: z
			.string()
			.min(6, { error: ZodErrors.PASSWORD_MIN_CHARACTERS })
			.trim()
			.regex(UPPER_CASE_REGEX, {
				error: ZodErrors.PASSWORD_MUST_CONTAIN_UPPERCASE,
			})
			.regex(LOWER_CASE_REGEX, {
				error: ZodErrors.PASSWORD_MUST_CONTAIN_LOWERCASE,
			})
			.regex(NUMBER_REGEX, { error: ZodErrors.PASSWORD_MUST_CONTAIN_NUMBER })
			.regex(SPECIAL_CHARACTER_REGEX, {
				error: ZodErrors.PASSWORD_MUST_CONTAIN_SPECIAL_CHARACTER,
			}),

		confirmPassword: z
			.string()
			.min(1, { error: ZodErrors.CONFIRM_PASSWORD_IS_REQUIRED })
			.trim(),
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		error: ZodErrors.PASSWORDS_MUST_BE_EQUAL,
	});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

export const SignUpForm = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState<boolean>(false);
	const [isPending, startTransition] = useTransition();

	const form = useForm<SignUpFormValues>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
	});

	const onSubmit = async (data: SignUpFormValues) => {
		startTransition(async () => {
			console.log(data);
		});
	};

	const passwordInputType = showPassword ? 'text' : 'password';
	const confirmPasswordInputType = showConfirmPassword ? 'text' : 'password';

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(prev => !prev);
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
									<Input type="text" placeholder="Seu nome" {...field} />
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
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="seu@email.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="flex flex-col gap-6 md:flex-row">
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
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirmar Senha</FormLabel>
									<div className="relative">
										<FormControl>
											<Input
												type={confirmPasswordInputType}
												placeholder="••••••"
												{...field}
											/>
										</FormControl>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="absolute top-0 right-0"
											onClick={toggleConfirmPasswordVisibility}
										>
											{showConfirmPassword ? (
												<EyeOff color={COLORS.PRIMARY} />
											) : (
												<Eye color={COLORS.PRIMARY} />
											)}
											<span className="sr-only">
												{showConfirmPassword
													? 'Esconder senha'
													: 'Mostrar senha'}
											</span>
										</Button>
									</div>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button type="submit" className="mt-2 w-full" disabled={isPending}>
						{isPending ? (
							<>
								<Spinner variant="bars" className="mr-2 animate-spin" />
								Processando...
							</>
						) : (
							'Cadastrar'
						)}
					</Button>
				</form>
			</Form>

			<PasswordStrengthBar control={form.control} name="password" />

			<AuthLink
				href={AppRoutes.SIGN_IN}
				text="Já tem uma conta?"
				linkText="Entrar"
			/>
		</div>
	);
};
