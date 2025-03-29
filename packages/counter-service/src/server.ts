import {
	ConfidentialClientApplication,
	type Configuration,
} from "@azure/msal-node";
import type { AzureConfig } from "./config";
import jwt from "jsonwebtoken";

export class ServerAuth {
	private msalInstance: ConfidentialClientApplication;
	private config: AzureConfig;

	constructor(config: AzureConfig) {
		this.config = config;
		const msalConfig: Configuration = {
			auth: {
				clientId: config.clientId,
				authority: `https://login.microsoftonline.com/${config.tenantId}`,
				clientSecret: process.env.AZURE_CLIENT_SECRET || "dummy-secret",
			},
		};
		this.msalInstance = new ConfidentialClientApplication(msalConfig);
	}

	async validateToken(token: string): Promise<boolean> {
		try {
			// First, verify the JWT token signature and basic claims
			const decodedToken = jwt.verify(
				token,
				process.env.AZURE_CLIENT_SECRET || "dummy-secret",
				{
					issuer: `https://login.microsoftonline.com/${this.config.tenantId}/v2.0`,
					audience: this.config.clientId,
				},
			) as jwt.JwtPayload;

			// Check if token has expired
			if (
				decodedToken.exp &&
				decodedToken.exp < Math.floor(Date.now() / 1000)
			) {
				throw new Error("Token has expired");
			}

			// Check if token has required scopes
			const tokenScopes = decodedToken.scp || decodedToken.scope || [];
			const hasRequiredScopes = this.config.scopes.every((requiredScope) =>
				tokenScopes.includes(requiredScope),
			);

			if (!hasRequiredScopes) {
				throw new Error("Token missing required scopes");
			}

			// For admin endpoints, verify additional claims
			if (this.config.scopes.includes("api://counter-service/decrease")) {
				const roles = decodedToken.roles || [];
				if (!roles.includes("admin")) {
					throw new Error("Insufficient privileges for admin access");
				}
			}

			// If all checks pass, validate with Azure AD
			const result = await this.msalInstance.acquireTokenOnBehalfOf({
				authority: `https://login.microsoftonline.com/${this.config.tenantId}`,
				oboAssertion: token,
				scopes: this.config.scopes,
			});

			return !!result;
		} catch (error) {
			console.error("Token validation failed:", error);
			return false;
		}
	}

	async getAccessToken(): Promise<string | null> {
		try {
			const result = await this.msalInstance.acquireTokenByClientCredential({
				scopes: this.config.scopes,
			});
			return result?.accessToken || null;
		} catch (error) {
			console.error("Token acquisition failed:", error);
			return null;
		}
	}

	hasRequiredScopes(token: string): Promise<boolean> {
		return this.validateToken(token);
	}
}
