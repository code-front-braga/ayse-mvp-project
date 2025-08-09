'use client';

import { ChartNoAxesCombined } from 'lucide-react';
import Link from 'next/link';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { AppRoutes } from '@/enums/app-routes';
import { COLORS } from '@/enums/colors';

import { sidebarLinks } from '../../data/sidebar-links';
import NavMain from './nav-main';

type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

const AppSidebar = ({ ...props }: AppSidebarProps) => {
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
		</Sidebar>
	);
};

export default AppSidebar;
