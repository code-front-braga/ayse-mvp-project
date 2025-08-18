'use client';

import { User } from 'generated/prisma';
import { EllipsisVertical, LogOut, UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

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

	const [isPending, startTransition] = useTransition();

	const handleSignOut = async () => {
		startTransition(async () => {
			try {
				await authClient.signOut({
					fetchOptions: {
						onSuccess: async () => {
							await authClient.getSession({
								query: { disableCookieCache: true },
							});
							router.push(AppRoutes.SIGN_IN);
						},
					},
				});
			} catch (error) {
				console.error('Erro ao fazer logout:', error);
			}
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
						<Link href={AppRoutes.DASHBOARD_SETTINGS} prefetch={true}>
							<UserRoundCog color={COLORS.PRIMARY} />
							Configurações
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<button
							type="button"
							onClick={handleSignOut}
							className="w-full"
							disabled={isPending}
						>
							<LogOut color={COLORS.PRIMARY} />
							{isPending ? 'Saindo...' : 'Sair'}
						</button>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;
