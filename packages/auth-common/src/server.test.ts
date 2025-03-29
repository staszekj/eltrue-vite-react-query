import { ServerAuth } from "./server";
import type { AzureConfig } from "./config";
import "@types/jest";

describe("ServerAuth", () => {
	const mockAdminConfig: AzureConfig = {
		clientId: "admin-client-id",
		tenantId: "tenant-id",
		scopes: ["api://users.admin/manage"],
		redirectUri: "http://localhost:3000/auth/callback",
	};

	const mockDocumentConfig: AzureConfig = {
		clientId: "document-client-id",
		tenantId: "tenant-id",
		scopes: ["api://documents/write"],
		redirectUri: "http://localhost:3000/auth/callback",
	};

	beforeEach(() => {
		// Reset environment variables
		process.env.AZURE_CLIENT_SECRET = "test-secret";
	});

	describe("validateToken", () => {
		it("should validate admin tokens with stricter rules", async () => {
			const auth = new ServerAuth(mockAdminConfig);
			const results = await Promise.all(
				Array(100)
					.fill(null)
					.map(() => auth.validateToken("mock-token")),
			);

			const successCount = results.filter(Boolean).length;
			expect(successCount).toBeLessThan(40); // Should fail ~70% of the time
		});

		it("should validate document tokens with normal rules", async () => {
			const auth = new ServerAuth(mockDocumentConfig);
			const results = await Promise.all(
				Array(100)
					.fill(null)
					.map(() => auth.validateToken("mock-token")),
			);

			const successCount = results.filter(Boolean).length;
			expect(successCount).toBeGreaterThan(60); // Should succeed ~70% of the time
		});
	});

	describe("getAccessToken", () => {
		it("should have lower success rate for admin token acquisition", async () => {
			const auth = new ServerAuth(mockAdminConfig);
			const results = await Promise.all(
				Array(100)
					.fill(null)
					.map(() => auth.getAccessToken()),
			);

			const successCount = results.filter(Boolean).length;
			expect(successCount).toBeLessThan(40); // Should fail ~70% of the time
		});

		it("should have higher success rate for document token acquisition", async () => {
			const auth = new ServerAuth(mockDocumentConfig);
			const results = await Promise.all(
				Array(100)
					.fill(null)
					.map(() => auth.getAccessToken()),
			);

			const successCount = results.filter(Boolean).length;
			expect(successCount).toBeGreaterThan(90); // Should almost always succeed
		});
	});

	describe("hasRequiredScopes", () => {
		it("should check scopes based on service type", async () => {
			const adminAuth = new ServerAuth(mockAdminConfig);
			const documentAuth = new ServerAuth(mockDocumentConfig);

			const adminResults = await Promise.all(
				Array(100)
					.fill(null)
					.map(() => adminAuth.hasRequiredScopes("mock-token")),
			);

			const documentResults = await Promise.all(
				Array(100)
					.fill(null)
					.map(() => documentAuth.hasRequiredScopes("mock-token")),
			);

			expect(adminResults.filter(Boolean).length).toBeLessThan(40);
			expect(documentResults.filter(Boolean).length).toBeGreaterThan(60);
		});
	});
});
