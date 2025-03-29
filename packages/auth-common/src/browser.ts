import {
	PublicClientApplication,
	type Configuration,
	type AccountInfo,
	type AuthenticationResult,
} from "@azure/msal-browser";
import type { AzureConfig } from "./config";

export class BrowserAuth {
	private msalInstance: PublicClientApplication;
	private config: AzureConfig;

	constructor(config: AzureConfig) {
		this.config = config;
		const msalConfig: Configuration = {
			auth: {
				clientId: config.clientId,
				authority: `https://login.microsoftonline.com/${config.tenantId}`,
				redirectUri: config.redirectUri,
			},
			cache: {
				cacheLocation: "sessionStorage",
				storeAuthStateInCookie: false,
			},
		};
		this.msalInstance = new PublicClientApplication(msalConfig);
	}

	async initialize(): Promise<void> {
		await this.msalInstance.initialize();
		// Handle redirect promise after initialization
		await this.msalInstance.handleRedirectPromise();
	}

	async login(): Promise<AuthenticationResult | null> {
		try {
			return await this.msalInstance.loginPopup({
				scopes: this.config.scopes,
			});
		} catch (error) {
			console.error("Login failed:", error);
			return null;
		}
	}

	async logout(): Promise<void> {
		try {
			const account = this.getAccount();
			if (account) {
				await this.msalInstance.logoutPopup({
					account,
				});
			}
		} catch (error) {
			console.error("Logout failed:", error);
		}
	}

	async getAccessToken(): Promise<string | null> {
		try {
			const account = this.getAccount();
			if (!account) {
				throw new Error("No active account");
			}

			const response = await this.msalInstance.acquireTokenSilent({
				account,
				scopes: this.config.scopes,
			});

			return response.accessToken;
		} catch (error) {
			console.error("Token acquisition failed:", error);
			// If silent token acquisition fails, try interactive
			try {
				const response = await this.msalInstance.acquireTokenPopup({
					scopes: this.config.scopes,
				});
				return response.accessToken;
			} catch (interactiveError) {
				console.error(
					"Interactive token acquisition failed:",
					interactiveError,
				);
				return null;
			}
		}
	}

	getAccount(): AccountInfo | null {
		const accounts = this.msalInstance.getAllAccounts();
		if (accounts.length === 0) {
			return null;
		}
		// Return the first account
		return accounts[0];
	}

	isAuthenticated(): boolean {
		return this.getAccount() !== null;
	}
}
