'use client';

import { useMemo } from 'react';

interface PasswordStrengthIndicatorProps {
	password: string;
}

interface PasswordStrength {
	score: number;
	label: string;
	color: string;
	bgColor: string;
	requirements: {
		minLength: boolean;
		hasUppercase: boolean;
		hasLowercase: boolean;
		hasNumber: boolean;
		hasSpecialChar: boolean;
	};
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
	const strength = useMemo((): PasswordStrength => {
		if (!password) {
			return {
				score: 0,
				label: '',
				color: '',
				bgColor: '',
				requirements: {
					minLength: false,
					hasUppercase: false,
					hasLowercase: false,
					hasNumber: false,
					hasSpecialChar: false,
				},
			};
		}

		const requirements = {
			minLength: password.length >= 8,
			hasUppercase: /[A-Z]/.test(password),
			hasLowercase: /[a-z]/.test(password),
			hasNumber: /\d/.test(password),
			hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		};

		const score = Object.values(requirements).filter(Boolean).length;

		let label = '';
		let color = '';
		let bgColor = '';

		switch (score) {
			case 0:
			case 1:
				label = 'Muito fraca';
				color = 'text-red-600';
				bgColor = 'bg-red-500';
				break;
			case 2:
				label = 'Fraca';
				color = 'text-orange-600';
				bgColor = 'bg-orange-500';
				break;
			case 3:
				label = 'Média';
				color = 'text-yellow-600';
				bgColor = 'bg-yellow-500';
				break;
			case 4:
				label = 'Forte';
				color = 'text-blue-600';
				bgColor = 'bg-blue-500';
				break;
			case 5:
				label = 'Muito forte';
				color = 'text-green-600';
				bgColor = 'bg-green-500';
				break;
		}

		return { score, label, color, bgColor, requirements };
	}, [password]);

	if (!password) return null;

	return (
		<div className="space-y-2">
			{/* Barra de força */}
			<div className="flex items-center gap-2">
				<div className="flex-1 bg-gray-200 rounded-full h-2">
					<div
						className={`h-2 rounded-full transition-all duration-300 ${strength.bgColor}`}
						style={{ width: `${(strength.score / 5) * 100}%` }}
					/>
				</div>
				<span className={`text-sm font-medium ${strength.color}`}>
					{strength.label}
				</span>
			</div>

			{/* Lista de requisitos */}
			<div className="text-xs space-y-1">
				<RequirementItem
					met={strength.requirements.minLength}
					text="Pelo menos 8 caracteres"
				/>
				<RequirementItem
					met={strength.requirements.hasUppercase}
					text="Uma letra maiúscula"
				/>
				<RequirementItem
					met={strength.requirements.hasLowercase}
					text="Uma letra minúscula"
				/>
				<RequirementItem
					met={strength.requirements.hasNumber}
					text="Um número"
				/>
				<RequirementItem
					met={strength.requirements.hasSpecialChar}
					text="Um caractere especial (!@#$%^&*)"
				/>
			</div>
		</div>
	);
};

interface RequirementItemProps {
	met: boolean;
	text: string;
}

const RequirementItem = ({ met, text }: RequirementItemProps) => (
	<div className={`flex items-center gap-2 ${met ? 'text-green-600' : 'text-gray-500'}`}>
		<span className="text-xs">
			{met ? '✓' : '○'}
		</span>
		<span>{text}</span>
	</div>
);