import { ServerAuth } from "./server";
import { counterServiceConfig } from "./config";
import { ValueService } from "value-service";

export class CounterService {
	private auth: ServerAuth;
	private valueService: ValueService;

	constructor() {
		this.auth = new ServerAuth(counterServiceConfig);
		this.valueService = new ValueService();
	}

	async increaseValue(token: string): Promise<void> {
		// Validate token has increase scope
		if (!(await this.hasScope(token, "api://counter-service/increase"))) {
			throw new Error("Insufficient permissions to increase value");
		}

		// Get current value
		const currentValue = await this.valueService.getValue(token);

		// Set new value
		await this.valueService.setValue(currentValue + 1, token);
	}

	async decreaseValue(token: string): Promise<void> {
		// Validate token has decrease scope
		if (!(await this.hasScope(token, "api://counter-service/decrease"))) {
			throw new Error("Insufficient permissions to decrease value");
		}

		// Get current value
		const currentValue = await this.valueService.getValue(token);

		// Set new value
		await this.valueService.setValue(currentValue - 1, token);
	}

	async getValue(token: string): Promise<number> {
		// Validate token has read scope for value service
		if (!(await this.hasScope(token, "api://value-service/read"))) {
			throw new Error("Insufficient permissions to get value");
		}

		return this.valueService.getValue(token);
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
