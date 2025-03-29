export interface AzureConfig {
	clientId: string;
	tenantId: string;
	scopes: string[];
}

// Common tenant ID for all services
const TENANT_ID = "22222222-2222-2222-2222-222222222222";

// Value Service Configuration (ServiceProvider_2)
export const valueServiceConfig: AzureConfig = {
	clientId: "22222222-2222-2222-2222-222222222222", // ServiceProvider_2's clientId
	tenantId: TENANT_ID,
	scopes: ["api://value-service/read", "api://value-service/write"],
};
