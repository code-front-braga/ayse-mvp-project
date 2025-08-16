import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface CardItemProps {
	title: string;
	description: string;
	actionChildren: React.ReactNode;
	footerChildren: React.ReactNode;
}

const CardItem = ({
	title,
	description,
	actionChildren,
	footerChildren,
}: CardItemProps) => {
	return (
		<Card className="@container/card">
			<CardHeader>
				<CardDescription className="text-primary/70">
					{description}
				</CardDescription>
				<CardTitle className="text-primary font-semibold tabular-nums @[250px]/card:text-lg">
					{title}
				</CardTitle>
				<CardAction>{actionChildren}</CardAction>
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1">
				{footerChildren}
			</CardFooter>
		</Card>
	);
};

export default CardItem;
