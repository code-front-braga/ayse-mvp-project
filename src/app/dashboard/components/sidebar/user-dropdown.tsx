import { User } from 'generated/prisma';
import { EllipsisVertical, LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { AppRoutes } from '@/enums/app-routes';
import { COLORS } from '@/enums/colors';
import { authClient } from '@/lib/better-auth-client';

import UserAvatar from './user-avatar';
import UserInfo from './user-info';

interface UserDropdownProps {
	user: Pick<User, 'name' | 'email' | 'image'>;
	isMobile: boolean;
}

const UserDropdown = ({ user, isMobile }: UserDropdownProps) => {
	const router = useRouter();

	const handleSignOut = () => {
		authClient.signOut({
			fetchOptions: { onSuccess: () => router.push(AppRoutes.SIGN_IN) },
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton
					size="lg"
					className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
				>
					<UserAvatar user={user} />
					<UserInfo user={user} />
					<EllipsisVertical color={COLORS.PRIMARY} className="ml-auto" />
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				side={isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<UserAvatar user={user} />
						<UserInfo user={user} />
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className="space-y-2">
					<DropdownMenuItem asChild>
						<Link href={AppRoutes.DASHBOARD_ACCOUNT}>
							<UserCircle color={COLORS.PRIMARY} />
							Conta
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button type="button" onClick={handleSignOut} className="w-full">
							<LogOut color={COLORS.PRIMARY} />
							Sair
						</button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;
