export interface AzureConfig {
	clientId: string;
	tenantId: string;
	redirectUri: string;
	scopes: string[];
}

// Common tenant ID for all services
const TENANT_ID = "22222222-2222-2222-2222-222222222222";

// Counter Service Configuration (ServiceProvider_1)
export const counterServiceConfig: AzureConfig = {
	clientId: "11111111-1111-1111-1111-111111111111", // ServiceProvider_1's clientId
	tenantId: TENANT_ID,
	redirectUri: "http://localhost:3001/auth/callback",
	scopes: [
		"api://counter-service/increase",
		"api://counter-service/decrease",
		"api://value-service/read", // Can read from value service
		"api://value-service/write", // Can write to value service
	],
};
