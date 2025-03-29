import { useState, useEffect } from "react";
import { counterService } from "../services/counterService";
import { useAuth } from "../context/AuthContext";

export function Counter() {
	const [count, setCount] = useState<number>(0);
	const { token } = useAuth();

	useEffect(() => {
		const fetchCount = async () => {
			try {
				const value = await counterService.getValue(token);
				setCount(value);
			} catch (error) {
				console.error("Failed to fetch count:", error);
			}
		};

		if (token) {
			fetchCount();
		}
	}, [token]);

	const handleIncrement = async () => {
		try {
			const newValue = await counterService.increment(token);
			setCount(newValue);
		} catch (error) {
			console.error("Failed to increment:", error);
		}
	};

	const handleDecrement = async () => {
		try {
			const newValue = await counterService.decrement(token);
			setCount(newValue);
		} catch (error) {
			console.error("Failed to decrement:", error);
		}
	};

	const handleReset = async () => {
		try {
			const newValue = await counterService.reset(token);
			setCount(newValue);
		} catch (error) {
			console.error("Failed to reset:", error);
		}
	};

	return (
		<div>
			<h2>Counter: {count}</h2>
			<div>
				<button type="button" onClick={handleDecrement}>
					-
				</button>
				<button type="button" onClick={handleIncrement}>
					+
				</button>
				<button type="button" onClick={handleReset}>
					Reset
				</button>
			</div>
		</div>
	);
}
