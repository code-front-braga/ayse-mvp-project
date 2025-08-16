'use server';

import { headers } from 'next/headers';

import { auth } from '@/lib/better-auth';
import { prisma } from '@/lib/prisma-client';

export const hasPurchases = async (): Promise<boolean> => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  if (!userId) return false;

  const purchaseCount = await prisma.purchase.count({
    where: { userId },
    take: 1,
  });

  return purchaseCount > 0;
};
