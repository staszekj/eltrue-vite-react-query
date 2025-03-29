import { describe, it, expect, vi, beforeEach } from "vitest";
import { counterService } from "./counterService";

describe("counterService", () => {
	const mockToken = "mock-token";
	const mockResponse = { value: 42 };

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("fetches counter value", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		});

		const result = await counterService.getValue(mockToken);

		expect(result).toBe(mockResponse.value);
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/counter"),
			expect.objectContaining({
				headers: {
					Authorization: `Bearer ${mockToken}`,
				},
			}),
		);
	});

	it("increments counter", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		});

		const result = await counterService.increment(mockToken);

		expect(result).toBe(mockResponse.value);
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/counter/increment"),
			expect.objectContaining({
				method: "POST",
				headers: {
					Authorization: `Bearer ${mockToken}`,
				},
			}),
		);
	});

	it("decrements counter", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		});

		const result = await counterService.decrement(mockToken);

		expect(result).toBe(mockResponse.value);
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/counter/decrement"),
			expect.objectContaining({
				method: "POST",
				headers: {
					Authorization: `Bearer ${mockToken}`,
				},
			}),
		);
	});

	it("resets counter", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: true,
			json: () => Promise.resolve(mockResponse),
		});

		const result = await counterService.reset(mockToken);

		expect(result).toBe(mockResponse.value);
		expect(fetch).toHaveBeenCalledWith(
			expect.stringContaining("/counter/reset"),
			expect.objectContaining({
				method: "POST",
				headers: {
					Authorization: `Bearer ${mockToken}`,
				},
			}),
		);
	});

	it("throws error when API call fails", async () => {
		global.fetch = vi.fn().mockResolvedValue({
			ok: false,
			status: 500,
		});

		await expect(counterService.getValue(mockToken)).rejects.toThrow(
			"Failed to get counter value",
		);
		await expect(counterService.increment(mockToken)).rejects.toThrow(
			"Failed to increment counter",
		);
		await expect(counterService.decrement(mockToken)).rejects.toThrow(
			"Failed to decrement counter",
		);
		await expect(counterService.reset(mockToken)).rejects.toThrow(
			"Failed to reset counter",
		);
	});
});
