import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { prisma } from './prisma-client';

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		autoSignIn: false,
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		},
	},
	session: {
		cookieCache: {
			enabled: false,
		},
		disableSessionRefresh: false,
	},
	database: prismaAdapter(prisma, {
		provider: 'postgresql',
	}),
});
