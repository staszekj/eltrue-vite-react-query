import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// Mock the MSAL instance
vi.mock("@azure/msal-browser", () => ({
	PublicClientApplication: vi.fn().mockImplementation(() => ({
		getAllAccounts: vi.fn().mockReturnValue([]),
		loginPopup: vi.fn().mockResolvedValue({ accessToken: "mock-token" }),
		logoutPopup: vi.fn().mockResolvedValue(undefined),
		acquireTokenSilent: vi
			.fn()
			.mockResolvedValue({ accessToken: "mock-token" }),
	})),
}));

// Mock the Counter component
vi.mock("./components/Counter", () => ({
	Counter: () => <div data-testid="counter">Counter Component</div>,
}));

// Mock the auth context
const mockAuth = {
	isAuthenticated: false,
	login: vi.fn(),
	logout: vi.fn(),
	token: null as string | null,
};

vi.mock("./context/AuthContext", () => ({
	useAuth: () => mockAuth,
	AuthProvider: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

describe("App", () => {
	beforeEach(() => {
		mockAuth.isAuthenticated = false;
		mockAuth.token = null;
		vi.clearAllMocks();
	});

	it("renders login button when not authenticated", () => {
		render(
			<AuthProvider>
				<App />
			</AuthProvider>,
		);

		expect(screen.getByText("Login")).toBeInTheDocument();
		expect(screen.queryByText("Logout")).not.toBeInTheDocument();
		expect(screen.queryByTestId("counter")).not.toBeInTheDocument();
	});

	it("shows counter and logout button after login", async () => {
		mockAuth.isAuthenticated = true;
		mockAuth.token = "mock-token";

		render(
			<AuthProvider>
				<App />
			</AuthProvider>,
		);

		expect(screen.getByText("Logout")).toBeInTheDocument();
		expect(screen.getByTestId("counter")).toBeInTheDocument();
		expect(screen.queryByText("Login")).not.toBeInTheDocument();
	});

	it("returns to login state after logout", async () => {
		mockAuth.isAuthenticated = true;
		mockAuth.token = "mock-token";
		mockAuth.logout.mockImplementation(() => {
			mockAuth.isAuthenticated = false;
			mockAuth.token = null;
		});

		const { rerender } = render(
			<AuthProvider>
				<App />
			</AuthProvider>,
		);

		expect(screen.getByText("Logout")).toBeInTheDocument();
		expect(screen.getByTestId("counter")).toBeInTheDocument();

		fireEvent.click(screen.getByText("Logout"));

		rerender(
			<AuthProvider>
				<App />
			</AuthProvider>,
		);

		expect(screen.getByText("Login")).toBeInTheDocument();
		expect(screen.queryByText("Logout")).not.toBeInTheDocument();
		expect(screen.queryByTestId("counter")).not.toBeInTheDocument();
	});
});
