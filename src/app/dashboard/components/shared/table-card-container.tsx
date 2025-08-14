import { Card } from '@/components/ui/card';

const TableCardContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<Card className="bg-border flex flex-1 flex-col shadow-md">
			<div className="flex flex-1 flex-col p-4">{children}</div>
		</Card>
	);
};

export default TableCardContainer;
