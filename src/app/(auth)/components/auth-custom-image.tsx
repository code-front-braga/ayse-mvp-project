import Image from 'next/image';

interface AuthCustomImageProps {
	src: string;
	alt: string;
	description: string;
}

export const AuthCustomImage = ({
	src,
	alt,
	description,
}: AuthCustomImageProps) => {
	return (
		<div className="bg-primary relative hidden lg:block">
			<Image
				src={src}
				alt={alt}
				fill
				priority={true}
				className="object-cover opacity-50"
			/>
			<p className="text-background font-zain absolute top-1/2 left-4 w-xl -translate-y-1/2 text-4xl font-bold text-shadow-lg">
				{description}
			</p>
		</div>
	);
};
