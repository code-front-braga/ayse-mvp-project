import { User } from 'generated/prisma';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { stringUtils } from '@/helpers/string-utils';

interface UserAvatarProps {
	user: Pick<User, 'name' | 'email' | 'image'>;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
	return (
		<Avatar className="size-8 rounded-lg">
			<AvatarImage
				src={user.image ?? undefined}
				alt={user.name ?? ''}
				className="object-cover"
			/>
			<AvatarFallback className="rounded-lg">
				{stringUtils.getFirstLettersUpperCase(user.name!)}
			</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
