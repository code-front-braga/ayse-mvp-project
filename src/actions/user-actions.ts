'use server';

import { prisma } from '@/lib/client';

export const getUserByEmail = async (email: string) => {
	if (!email) return null;

	return await prisma.user.findUnique({
		where: { email },
		select: { name: true, image: true, email: true },
	});
};
