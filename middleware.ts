import { getSessionCookie } from 'better-auth/cookies';
import { NextRequest, NextResponse } from 'next/server';

import { AppRoutes } from '@/enums/app-routes';

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

	// Permitir acesso às rotas de autenticação (verificação de email, etc.)
	if (
		request.nextUrl.pathname.startsWith(AppRoutes.API_AUTH) ||
		request.nextUrl.pathname.startsWith(AppRoutes.VERIFY_EMAIL)
	) {
		return NextResponse.next();
	}

	// THIS IS NOT SECURE!
	// This is the recommended approach to optimistically redirect users
	// We recommend handling auth checks in each page/route
	if (!sessionCookie) {
		return NextResponse.redirect(new URL('/', request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*'], // Proteger todas as rotas do dashboard
};
