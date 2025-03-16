import type { Item } from "api";
import { type FC, type KeyboardEvent, useCallback } from "react";

interface Props {
	items: Item[];
	onSelect: (item: Item) => void;
}

export const TestComponent: FC<Props> = ({ items, onSelect }) => {
	const handleKeyDown = useCallback(
		(item: Item) => (event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === "Enter" || event.key === " ") {
				onSelect(item);
			}
		},
		[onSelect],
	);

	return (
		<div>
			{items.map((item) => (
				<div
					key={item.id}
					role="button"
					tabIndex={0}
					onClick={() => onSelect(item)}
					onKeyDown={handleKeyDown(item)}
				>
					{item.name}
				</div>
			))}
		</div>
	);
};
