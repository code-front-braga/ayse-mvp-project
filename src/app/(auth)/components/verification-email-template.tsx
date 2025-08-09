import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components';

interface VerificationEmailProps {
	url: string;
	name: string;
}

export const VerificationEmailTemplate = ({
	url,
	name,
}: VerificationEmailProps) => {
	// Logo SVG com as cores e design corretos do Ayse
	const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(
		`
		<svg width="140" height="50" viewBox="0 0 140 50" fill="none" xmlns="http://www.w3.org/2000/svg">
			<!-- Fundo com gradiente sutil -->
			<rect width="140" height="50" rx="12" fill="url(#gradient)" stroke="#e5e7eb" stroke-width="1"/>

			<!-- Ícone ChartNoAxesCombined -->
			<g transform="translate(20, 15)">
				<path d="M3 3v18h18" stroke="#d97706" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
				<path d="m7 14 4-4 4 4 6-6" stroke="#d97706" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
			</g>

			<!-- Texto "ayse" -->
			<text x="50" y="32" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="400" fill="#d97706">
				ayse
			</text>

			<!-- Gradiente -->
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" style="stop-color:#fefefe;stop-opacity:1" />
					<stop offset="100%" style="stop-color:#f9fafb;stop-opacity:1" />
				</linearGradient>
			</defs>
		</svg>
	`,
	).toString('base64')}`;

	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>Verifique seu email - Ayse</Preview>
				<Container style={container}>
					<Section style={logoSection}>
						<Img
							src={logoDataUri}
							width={140}
							height={50}
							alt="Ayse Logo"
							style={logo}
						/>
					</Section>
					<Heading style={heading}>Olá, {name}!</Heading>
					<Text style={paragraph}>
						Obrigado por se cadastrar no <strong>Ayse</strong>! Para completar
						seu cadastro e começar a controlar seus gastos, você precisa
						verificar seu endereço de email.
					</Text>
					<Section style={buttonContainer}>
						<Button href={url} style={button}>
							Verificar Email
						</Button>
					</Section>
					<Text style={paragraph}>
						Ou copie e cole este link no seu navegador:
					</Text>
					<Link href={url} style={link}>
						{url}
					</Link>
					<Hr style={hr} />
					<Text style={footer}>
						Este link expira em 1 hora por motivos de segurança. Se você não
						solicitou esta verificação, pode ignorar este email.
					</Text>
					<Text style={footer}>Equipe Ayse</Text>
				</Container>
			</Body>
		</Html>
	);
};

VerificationEmailTemplate.PreviewProps = {
	url: 'https://ayse.com/verify-email',
	name: 'João Silva',
} as VerificationEmailProps;

export default VerificationEmailTemplate;

const main = {
	backgroundColor: '#f8fafc',
	backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
	padding: '20px 0',
};

const container = {
	backgroundColor: '#ffffff',
	border: '1px solid #e5e7eb',
	borderRadius: '12px',
	margin: '40px auto',
	padding: '40px',
	maxWidth: '560px',
	boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
};

const logoSection = {
	textAlign: 'center' as const,
	marginBottom: '32px',
	paddingBottom: '24px',
	borderBottom: '1px solid #f0f0f0',
};

const logo = {
	display: 'block',
	margin: '0 auto',
};

const heading = {
	fontSize: '28px',
	letterSpacing: '-0.5px',
	lineHeight: '1.3',
	fontWeight: '600',
	color: '#1a1a1a',
	margin: '0 0 20px',
};

const paragraph = {
	margin: '0 0 20px',
	fontSize: '16px',
	lineHeight: '1.6',
	color: '#374151',
};

const buttonContainer = {
	textAlign: 'center' as const,
	margin: '32px 0',
};

const button = {
	backgroundColor: '#d97706',
	backgroundImage: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
	borderRadius: '8px',
	color: '#ffffff',
	fontSize: '16px',
	fontWeight: '600',
	textDecoration: 'none',
	textAlign: 'center' as const,
	display: 'inline-block',
	padding: '14px 28px',
	margin: '0 auto',
	boxShadow: '0 4px 12px rgba(217, 119, 6, 0.3)',
	border: 'none',
};

const link = {
	color: '#d97706',
	fontSize: '14px',
	textDecoration: 'underline',
	wordBreak: 'break-all' as const,
};

const footer = {
	color: '#6b7280',
	fontSize: '14px',
	lineHeight: '1.5',
	margin: '8px 0 0',
};

const hr = {
	borderColor: '#e5e7eb',
	margin: '32px 0',
};
