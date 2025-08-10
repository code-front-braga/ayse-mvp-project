'use client';

import { User } from 'generated/prisma';

import { SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

import UserDropdown from './user-dropdown';

interface NavUserProps {
	user: Pick<User, 'name' | 'email' | 'image'>;
}

const NavUser = ({ user }: NavUserProps) => {
	if (!user) return null;

	const isMobile = useIsMobile();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<UserDropdown user={user} isMobile={isMobile} />
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export default NavUser;
