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
				quality={100}
				priority={true}
				className="object-cover opacity-30"
			/>
			<p className="text-background font-zain absolute top-2/6 left-4 w-xl text-4xl font-bold">
				{description}
			</p>
		</div>
	);
};
