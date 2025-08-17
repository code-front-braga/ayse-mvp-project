import z from 'zod';

import { stringUtils } from '@/helpers/string-utils';

import { ZodErrors } from '../enums/zod-errors';

export const forgotPasswordSchema = z.object({
	email: z
		.email(ZodErrors.INVALID_EMAIL)
		.min(1, ZodErrors.EMAIL_IS_REQUIRED)
		.trim()
		.transform(stringUtils.toLowerCase),
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
	.object({
		password: z
			.string()
			.min(8, ZodErrors.PASSWORD_MIN_CHARACTERS)
			.regex(/[A-Z]/, ZodErrors.PASSWORD_MUST_CONTAIN_UPPERCASE)
			.regex(/[a-z]/, ZodErrors.PASSWORD_MUST_CONTAIN_LOWERCASE)
			.regex(/[0-9]/, ZodErrors.PASSWORD_MUST_CONTAIN_NUMBER)
			.regex(/[^A-Za-z0-9]/, ZodErrors.PASSWORD_MUST_CONTAIN_SPECIAL_CHARACTER),
		confirmPassword: z.string().min(1, ZodErrors.CONFIRM_PASSWORD_IS_REQUIRED),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: ZodErrors.PASSWORDS_MUST_BE_EQUAL,
		path: ['confirmPassword'],
	});

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;
