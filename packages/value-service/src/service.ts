import { ServerAuth } from "./server";
import { valueServiceConfig } from "./config";

export class ValueService {
	private value = 0;
	private auth: ServerAuth;

	constructor() {
		this.auth = new ServerAuth(valueServiceConfig);
	}

	async setValue(newValue: number, token: string): Promise<void> {
		// Validate token has write scope
		if (!(await this.auth.hasRequiredScopes(token))) {
			throw new Error("Insufficient permissions to set value");
		}
		this.value = newValue;
	}

	async getValue(token: string): Promise<number> {
		// Validate token has read scope
		if (!(await this.auth.hasRequiredScopes(token))) {
			throw new Error("Insufficient permissions to get value");
		}
		return this.value;
	}

	// Helper method to check if token has specific scope
	private async hasScope(token: string, scope: string): Promise<boolean> {
		try {
			const decodedToken = await this.auth.validateToken(token);
			return decodedToken;
		} catch (error) {
			return false;
		}
	}
}
