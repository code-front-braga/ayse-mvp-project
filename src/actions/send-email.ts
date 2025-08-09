'use server';

import { Resend } from 'resend';

import VerificationEmailTemplate from '@/app/(auth)/components/verification-email-template';
import { emailConfig, validateEmailConfig } from '@/lib/email-config';

const resend = new Resend(emailConfig.resendApiKey);

interface SendEmailParams {
	url: string;
	user: {
		id: string;
		email: string;
		name: string;
		emailVerified: boolean;
		image?: string | null;
		createdAt: Date;
		updatedAt: Date;
	};
}

export const sendEmail = async ({ url, user }: SendEmailParams) => {
	try {
		// Validar configurações
		validateEmailConfig();

		if (!user.email) {
			throw new Error('Email do usuário não encontrado');
		}

		// Enviar email
		const { data, error } = await resend.emails.send({
			from: emailConfig.fromEmail,
			to: [user.email],
			subject: 'Verifique seu email - Ayse',
			react: VerificationEmailTemplate({
				url,
				name: user.name || 'Usuário',
			}),
		});

		if (error) {
			console.error('Erro ao enviar email de verificação:', error);
			const errorMessage =
				error.message ||
				error.name ||
				JSON.stringify(error) ||
				'Erro desconhecido do Resend';
			throw new Error(`Falha ao enviar email: ${errorMessage}`);
		}

		console.log(`Email de verificação enviado para ${user.email}:`, data?.id);
		return { success: true, emailId: data?.id };
	} catch (error) {
		console.error('Erro ao enviar email de verificação:', error);

		// Em desenvolvimento, mostrar erro detalhado
		if (process.env.NODE_ENV === 'development') {
			console.error('Detalhes do erro:', error);
		}

		// Não relançar o erro para não quebrar o fluxo de autenticação
		return {
			success: false,
			error: error instanceof Error ? error.message : 'Erro desconhecido',
		};
	}
};
