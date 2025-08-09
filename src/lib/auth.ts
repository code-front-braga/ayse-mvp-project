import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { sendEmail } from '@/actions/send-email';
import { AppRoutes } from '@/enums/app-routes';

import { prisma } from './client';

export const auth = betterAuth({
	baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		autoSignIn: false,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},

	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),

	emailVerification: {
		sendVerificationEmail: async ({ user, url }) => {
			const modifiedUrl = url.replace(
				'/api/auth/verify-email',
				AppRoutes.VERIFY_EMAIL,
			);
			await sendEmail({ user, url: modifiedUrl });
		},
		sendOnSignUp: true,
		autoSignInAfterVerification: false,
		expiresIn: 3600,
	},
});
