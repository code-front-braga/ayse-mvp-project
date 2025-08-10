'use client';

import { User } from 'generated/prisma';
import { ChartNoAxesCombined } from 'lucide-react';
import Link from 'next/link';

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { AppRoutes } from '@/enums/app-routes';
import { COLORS } from '@/enums/colors';

import { sidebarLinks } from '../../data/sidebar-links';
import NavMain from './nav-main';
import NavUser from './nav-user';

type AppSidebarProps = {
	user: Pick<User, 'name' | 'email' | 'image'>;
} & React.ComponentProps<typeof Sidebar>;

const AppSidebar = ({ user, ...props }: AppSidebarProps) => {
	return (
		<Sidebar {...props} collapsible="icon" variant="floating">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							asChild
							className="data-[slot=sidebar-menu-button]:!p-1.5"
						>
							<Link
								href={AppRoutes.DASHBOARD_OVERVIEW}
								prefetch={true}
								replace={true}
							>
								<ChartNoAxesCombined color={COLORS.PRIMARY} size={16} />
								<span className="text-primary">ayse</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={sidebarLinks.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
};

export default AppSidebar;
