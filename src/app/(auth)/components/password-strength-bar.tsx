import { CheckIcon, XIcon } from 'lucide-react';
import { useMemo } from 'react';

interface PasswordRequirement {
	regex: RegExp;
	text: string;
}

interface PasswordStrengthBarProps {
	password: string;
	className?: string;
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
	{ regex: /.{6,}/, text: 'Pelo menos 6 caracteres' },
	{ regex: /[0-9]/, text: 'Pelo menos 1 número' },
	{ regex: /[a-z]/, text: 'Pelo menos 1 letra minúscula' },
	{ regex: /[A-Z]/, text: 'Pelo menos 1 letra maiúscula' },
	{ regex: /[^A-Za-z0-9]/, text: 'Pelo menos 1 caracter especial' },
];

const STRENGTH_CONFIG = {
	0: { color: 'bg-border', label: 'Digite uma senha' },
	1: { color: 'bg-red-500', label: 'Senha fraca' },
	2: { color: 'bg-orange-500', label: 'Senha fraca' },
	3: { color: 'bg-amber-500', label: 'Senha média' },
	4: { color: 'bg-emerald-500', label: 'Senha forte' },
	5: { color: 'bg-emerald-500', label: 'Senha forte' },
} as const;

export const PasswordStrengthBar = ({
	password,
	className,
}: PasswordStrengthBarProps) => {

	const strength = useMemo(
		() =>
			PASSWORD_REQUIREMENTS.map(req => ({
				met: req.regex.test(password || ''),
				text: req.text,
			})),
		[password],
	);

	const score = strength.filter(s => s.met).length;
	const config =
		STRENGTH_CONFIG[score as keyof typeof STRENGTH_CONFIG] ||
		STRENGTH_CONFIG[0];

	return (
		<div className={`mt-2 space-y-2 ${className || ''}`}>
			<div
				className="bg-border h-1 w-full overflow-hidden rounded-full"
				role="progressbar"
				aria-valuenow={score}
				aria-valuemin={0}
				aria-valuemax={5}
				aria-label="Força da senha"
			>
				<div
					className={`h-full ${config.color} transition-all duration-500 ease-out`}
					style={{ width: `${(score / 5) * 100}%` }}
				/>
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-sm font-medium">{config.label}</span>
				<span className="text-muted-foreground text-xs">Deve conter:</span>
				<ul className="bg-primary/10 space-y-1.5 rounded p-2">
					{strength.map((req, index) => (
						<li key={index} className="flex items-center gap-2">
							{req.met ? (
								<CheckIcon
									size={16}
									className="text-emerald-500"
									aria-label="Requisito atendido"
								/>
							) : (
								<XIcon
									size={16}
									className="text-muted-foreground/80"
									aria-label="Requisito não atendido"
								/>
							)}
							<span
								className={`text-xs ${
									req.met ? 'text-emerald-600' : 'text-muted-foreground'
								}`}
							>
								{req.text}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
