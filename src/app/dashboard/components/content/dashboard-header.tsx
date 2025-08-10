import { stringUtils } from '@/helpers/string-utils';

interface DashboardHeaderProps {
	title: string;
	description: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
	return (
		<header className="flex items-center justify-between">
			<div className="flex flex-col">
				<h2 className="font-zain text-2xl font-semibold text-gray-800 md:text-4xl">
					{title}
				</h2>
				<p className="text-muted-foreground text-xs md:text-sm">
					{description}
				</p>
			</div>
			<p className="text-muted-foreground hidden text-xs md:block">
				Hoje, {stringUtils.formatDateToBRL(new Date())}
			</p>
		</header>
	);
};

export default DashboardHeader;
