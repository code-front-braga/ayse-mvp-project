const AuthWrapperForms = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			{children}
		</div>
	);
};

export default AuthWrapperForms;
