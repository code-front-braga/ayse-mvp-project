'use client';

import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import DrawerDialogPurchaseForm from './drawer-dialog-purchase-form';

export interface NavMainProps {
	items: {
		label: string;
		icon: LucideIcon;
		href: string;
	}[];
}

const NavMain = ({ items }: NavMainProps) => {
	const { setOpenMobile } = useSidebar();

	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarGroupContent className="flex flex-col gap-6">
				<SidebarMenu>
					<SidebarMenuItem className="flex items-center gap-2">
						<DrawerDialogPurchaseForm setIsSidebarOpen={setOpenMobile} />
					</SidebarMenuItem>
				</SidebarMenu>
				<SidebarMenu className="flex flex-col gap-4">
					{items.map(item => {
						const isActive = pathname === item.href;
						return (
							<SidebarMenuItem key={item.href}>
								<SidebarMenuButton
									asChild
									tooltip={item.label}
									className={cn(
										'transition-colors duration-200 hover:bg-gray-100',
										isActive &&
											'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground shadow-lg',
									)}
								>
									<Link href={item.href} prefetch={true} replace={true}>
										<item.icon />
										<span>{item.label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};

export default NavMain;
