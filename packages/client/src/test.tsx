import type { Item } from "api/src/types";
import type React from "react";

interface TestProps {
	items: Item[];
	onSelect: (item: Item) => void;
}

export function Test({ items, onSelect }: TestProps) {
	const handleKeyDown =
		(item: Item) => (event: React.KeyboardEvent<HTMLButtonElement>) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				onSelect(item);
			}
		};

	return (
		<div>
			{items.map((item) => (
				<button
					key={item.id}
					type="button"
					onClick={() => onSelect(item)}
					onKeyDown={handleKeyDown(item)}
				>
					{item.name}
				</button>
			))}
		</div>
	);
}
