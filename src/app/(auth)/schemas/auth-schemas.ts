import z from 'zod';

import { toLowerCase } from '@/helpers/to-lower-case';
import { toTitleCase } from '@/helpers/to-title-case';

import {
	LOWER_CASE_REGEX,
	NUMBER_REGEX,
	SPECIAL_CHARACTER_REGEX,
	UPPER_CASE_REGEX,
} from '../constants/regex';
import { ZodErrors } from '../enums/zod-errors';

const emailSchema = z
	.email({ error: ZodErrors.INVALID_EMAIL })
	.min(1, { error: ZodErrors.EMAIL_IS_REQUIRED })
	.trim()
	.transform(toLowerCase);

const passwordSchema = z
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
	});

const simplePasswordSchema = z
	.string()
	.min(1, { error: ZodErrors.PASSWORD_IS_REQUIRED })
	.min(6, { error: ZodErrors.PASSWORD_MIN_CHARACTERS });

const nameSchema = z
	.string()
	.min(6, { error: ZodErrors.NAME_IS_REQUIRED })
	.max(30, { error: ZodErrors.NAME_MAX_CHARACTERS })
	.trim()
	.transform(toTitleCase);

const confirmPasswordSchema = z
	.string()
	.min(1, { error: ZodErrors.CONFIRM_PASSWORD_IS_REQUIRED })
	.trim();

export const signInFormSchema = z.object({
	email: emailSchema,
	password: simplePasswordSchema,
});

export const signUpFormSchema = z
	.object({
		name: nameSchema,
		email: emailSchema,
		password: passwordSchema,
		confirmPassword: confirmPasswordSchema,
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		error: ZodErrors.PASSWORDS_MUST_BE_EQUAL,
	});

export type SignInFormValues = z.infer<typeof signInFormSchema>;
export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
