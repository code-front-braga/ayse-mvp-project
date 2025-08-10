export const stringUtils = {
	toLowerCase: (value: string): string => value.toLowerCase(),

	toTitleCase: (value: string): string =>
		value
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' '),

	normalize: (value: string): string => value.trim().replace(/\s+/g, ' '),

	getFirstLetter: (value: string): string => value.charAt(0),

	getFirstLettersUpperCase: (value: string): string =>
		value
			.split(' ')
			.map(word => word.charAt(0))
			.join('')
			.toUpperCase()
			.slice(0, 2),
} as const;
