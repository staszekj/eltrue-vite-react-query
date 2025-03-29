import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuth, AuthProvider } from "./AuthContext";

// Mock the MSAL instance
const mockMsal = {
	getAllAccounts: vi.fn().mockReturnValue([]),
	loginPopup: vi.fn(),
	logoutPopup: vi.fn(),
	acquireTokenSilent: vi.fn(),
};

vi.mock("@azure/msal-browser", () => ({
	PublicClientApplication: vi.fn().mockImplementation(() => mockMsal),
}));

describe("AuthContext", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("provides initial unauthenticated state", () => {
		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider,
		});

		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.token).toBe(null);
	});

	it("handles successful login", async () => {
		const mockToken = "mock-token";
		mockMsal.loginPopup.mockResolvedValueOnce({ accessToken: mockToken });

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider,
		});

		await act(async () => {
			await result.current.login();
		});

		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.token).toBe(mockToken);
	});

	it("handles successful logout", async () => {
		const mockToken = "mock-token";
		mockMsal.loginPopup.mockResolvedValueOnce({ accessToken: mockToken });
		mockMsal.logoutPopup.mockResolvedValueOnce(undefined);

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider,
		});

		// Login first
		await act(async () => {
			await result.current.login();
		});

		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.token).toBe(mockToken);

		// Then logout
		await act(async () => {
			await result.current.logout();
		});

		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.token).toBe(null);
	});

	it("handles login error", async () => {
		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});
		mockMsal.loginPopup.mockRejectedValueOnce(new Error("Login failed"));

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider,
		});

		await act(async () => {
			await result.current.login();
		});

		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.token).toBe(null);
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Login failed",
			expect.any(Error),
		);

		consoleErrorSpy.mockRestore();
	});

	it("handles logout error", async () => {
		const mockToken = "mock-token";
		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});
		mockMsal.loginPopup.mockResolvedValueOnce({ accessToken: mockToken });
		mockMsal.logoutPopup.mockRejectedValueOnce(new Error("Logout failed"));

		const { result } = renderHook(() => useAuth(), {
			wrapper: AuthProvider,
		});

		// Login first
		await act(async () => {
			await result.current.login();
		});

		expect(result.current.isAuthenticated).toBe(true);
		expect(result.current.token).toBe(mockToken);

		// Then try to logout
		await act(async () => {
			await result.current.logout();
		});

		expect(result.current.isAuthenticated).toBe(false);
		expect(result.current.token).toBe(null);
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			"Logout failed",
			expect.any(Error),
		);

		consoleErrorSpy.mockRestore();
	});
});
