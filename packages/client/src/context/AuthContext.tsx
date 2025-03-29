import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { PublicClientApplication } from "@azure/msal-browser";

export type AuthContextType = {
	isAuthenticated: boolean;
	token: string | null;
	login: () => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const msalConfig = {
	auth: {
		clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
		authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
		redirectUri: window.location.origin,
	},
};

const msalInstance = new PublicClientApplication(msalConfig);

// Define the scopes we need from our APIs
const requiredScopes = [
	"api://counter-service/increase",
	"api://value-service/read",
];

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const checkAuth = async () => {
			const accounts = msalInstance.getAllAccounts();
			if (accounts.length > 0) {
				try {
					const response = await msalInstance.acquireTokenSilent({
						scopes: requiredScopes,
						account: accounts[0],
					});
					setToken(response.accessToken);
					setIsAuthenticated(true);
				} catch (error) {
					console.error("Silent token acquisition failed", error);
					setIsAuthenticated(false);
					setToken(null);
				}
			}
		};
		checkAuth();
	}, []);

	const login = async () => {
		try {
			const response = await msalInstance.loginPopup({
				scopes: requiredScopes,
			});
			if (response?.accessToken) {
				setToken(response.accessToken);
				setIsAuthenticated(true);
			}
		} catch (error) {
			console.error("Login failed", error);
			setIsAuthenticated(false);
			setToken(null);
		}
	};

	const logout = async () => {
		try {
			await msalInstance.logoutPopup();
			setIsAuthenticated(false);
			setToken(null);
		} catch (error) {
			console.error("Logout failed", error);
			// Still set to logged out state even if the logout call fails
			setIsAuthenticated(false);
			setToken(null);
		}
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
