import z from 'zod';

import { stringUtils } from '@/helpers/string-utils';

import {
	LOWER_CASE_REGEX,
	NUMBER_REGEX,
	SPECIAL_CHARACTER_REGEX,
	UPPER_CASE_REGEX,
} from '../constants/regex';
import { ZodErrors } from '../enums/zod-errors';

const emailSchema = z
	.email(ZodErrors.INVALID_EMAIL)
	.min(1, ZodErrors.EMAIL_IS_REQUIRED)
	.trim()
	.transform(stringUtils.toLowerCase);

export const signInSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, ZodErrors.PASSWORD_IS_REQUIRED),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export const signUpSchema = z
	.object({
		name: z
			.string()
			.min(2, ZodErrors.NAME_IS_REQUIRED)
			.max(30, ZodErrors.NAME_MAX_CHARACTERS)
			.trim()
			.transform(stringUtils.toTitleCase),
		email: emailSchema,
		password: z
			.string()
			.min(8, ZodErrors.PASSWORD_MIN_CHARACTERS)
			.regex(UPPER_CASE_REGEX, ZodErrors.PASSWORD_MUST_CONTAIN_UPPERCASE)
			.regex(LOWER_CASE_REGEX, ZodErrors.PASSWORD_MUST_CONTAIN_LOWERCASE)
			.regex(NUMBER_REGEX, ZodErrors.PASSWORD_MUST_CONTAIN_NUMBER)
			.regex(
				SPECIAL_CHARACTER_REGEX,
				ZodErrors.PASSWORD_MUST_CONTAIN_SPECIAL_CHARACTER,
			),

		confirmPassword: z.string().min(1, ZodErrors.CONFIRM_PASSWORD_IS_REQUIRED),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: ZodErrors.PASSWORDS_MUST_BE_EQUAL,

		path: ['confirmPassword'],
	});

export type SignUpFormData = z.infer<typeof signUpSchema>;
