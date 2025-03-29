import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Counter } from "./Counter";
import { counterService } from "../services/counterService";

// Mock the counter service
vi.mock("../services/counterService", () => ({
	counterService: {
		getValue: vi.fn(),
		increment: vi.fn(),
		decrement: vi.fn(),
		reset: vi.fn(),
	},
}));

// Mock the auth context
vi.mock("../context/AuthContext", () => ({
	useAuth: () => ({
		token: "mock-token",
	}),
	AuthProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

describe("Counter", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders counter with initial value", async () => {
		const mockValue = 42;
		vi.mocked(counterService.getValue).mockResolvedValueOnce(mockValue);

		render(<Counter />);

		await waitFor(() => {
			const counterText = screen.getByText(/counter:/i);
			expect(counterText).toHaveTextContent(`Counter: ${mockValue}`);
		});
	});

	it("increments counter when + button is clicked", async () => {
		const initialValue = 42;
		const newValue = 43;
		vi.mocked(counterService.getValue).mockResolvedValueOnce(initialValue);
		vi.mocked(counterService.increment).mockResolvedValueOnce(newValue);

		render(<Counter />);

		await waitFor(() => {
			const counterText = screen.getByText(/counter:/i);
			expect(counterText).toHaveTextContent(`Counter: ${initialValue}`);
		});

		fireEvent.click(screen.getByText("+"));

		await waitFor(() => {
			const counterText = screen.getByText(/counter:/i);
			expect(counterText).toHaveTextContent(`Counter: ${newValue}`);
		});
	});

	it("decrements counter when - button is clicked", async () => {
		const initialValue = 42;
		const newValue = 41;
		vi.mocked(counterService.getValue).mockResolvedValueOnce(initialValue);
		vi.mocked(counterService.decrement).mockResolvedValueOnce(newValue);

		render(<Counter />);

		await waitFor(() => {
			const counterText = screen.getByText(/counter:/i);
			expect(counterText).toHaveTextContent(`Counter: ${initialValue}`);
		});

		fireEvent.click(screen.getByText("-"));

		await waitFor(() => {
			const counterText = screen.getByText(/counter:/i);
			expect(counterText).toHaveTextContent(`Counter: ${newValue}`);
		});
	});

	it("resets counter when Reset button is clicked", async () => {
		const initialValue = 42;
		const resetValue = 0;
		vi.mocked(counterService.getValue).mockResolvedValueOnce(initialValue);
		vi.mocked(counterService.reset).mockResolvedValueOnce(resetValue);

		render(<Counter />);

		await waitFor(() => {
			const counterText = screen.getByText(/counter:/i);
			expect(counterText).toHaveTextContent(`Counter: ${initialValue}`);
		});

		fireEvent.click(screen.getByText("Reset"));

		await waitFor(() => {
			const counterText = screen.getByText(/counter:/i);
			expect(counterText).toHaveTextContent(`Counter: ${resetValue}`);
		});
	});

	it("handles error when fetching initial value", async () => {
		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});
		vi.mocked(counterService.getValue).mockRejectedValueOnce(
			new Error("Failed to fetch"),
		);

		render(<Counter />);

		await waitFor(() => {
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				"Failed to fetch count:",
				expect.any(Error),
			);
		});

		consoleErrorSpy.mockRestore();
	});
});
