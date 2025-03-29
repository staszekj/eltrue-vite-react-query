const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const counterService = {
	async getValue(token: string): Promise<number> {
		const response = await fetch(`${API_URL}/counter`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to get counter value");
		}
		const data = await response.json();
		return data.value;
	},

	async increment(token: string): Promise<number> {
		const response = await fetch(`${API_URL}/counter/increment`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to increment counter");
		}
		const data = await response.json();
		return data.value;
	},

	async decrement(token: string): Promise<number> {
		const response = await fetch(`${API_URL}/counter/decrement`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to decrement counter");
		}
		const data = await response.json();
		return data.value;
	},

	async reset(token: string): Promise<number> {
		const response = await fetch(`${API_URL}/counter/reset`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error("Failed to reset counter");
		}
		const data = await response.json();
		return data.value;
	},
};
