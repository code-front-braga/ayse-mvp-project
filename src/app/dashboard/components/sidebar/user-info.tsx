import { User } from 'generated/prisma';

interface UserInfoProps {
	user: Pick<User, 'name' | 'email'>;
}

const UserInfo = ({ user }: UserInfoProps) => {
	return (
		<div className="grid flex-1 text-left text-sm leading-tight">
			<span className="truncate font-medium">{user.name}</span>
			<span className="text-muted-foreground truncate text-xs">
				{user.email}
			</span>
		</div>
	);
};

export default UserInfo;
