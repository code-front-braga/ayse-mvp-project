'use client';

import { useCallback, useState } from 'react';

export const usePasswordVisibility = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const toggleVisibility = useCallback(() => {
		setShowPassword(prev => !prev);
	}, []);

	const inputType = showPassword ? 'text' : 'password';

	return {
		showPassword,
		toggleVisibility,
		inputType,
	} as const;
};
