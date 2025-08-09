export const emailConfig = {
	resendApiKey: process.env.RESEND_API_KEY || '',
	// Para testes, use o domínio sandbox do Resend
	fromEmail: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
	isConfigured: !!process.env.RESEND_API_KEY,
} as const;

export const validateEmailConfig = () => {
	if (!emailConfig.resendApiKey) {
		throw new Error(
			'RESEND_API_KEY não está configurada. Adicione a chave da API do Resend no arquivo .env'
		);
	}

	if (!emailConfig.fromEmail.includes('@')) {
		throw new Error(
			'RESEND_FROM_EMAIL deve ser um endereço de email válido'
		);
	}

	return true;
};