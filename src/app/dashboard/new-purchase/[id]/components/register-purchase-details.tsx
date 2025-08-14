interface RegisterPurchaseDetails {
	label: string;
	description: string;
}

const RegisterPurchaseDetails = ({
	label,
	description,
}: RegisterPurchaseDetails) => {
	return (
		<div className="flex items-center gap-1 text-sm">
			<span className="text-muted-foreground">{label}:</span>
			<p className="text-primary font-semibold">{description}</p>
		</div>
	);
};

export default RegisterPurchaseDetails;
