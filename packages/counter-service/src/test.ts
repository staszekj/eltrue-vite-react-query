import { CounterService } from "./service";

// Simulated tokens for our users
const johnToken = {
	aud: "11111111-1111-1111-1111-111111111111", // Counter Service clientId
	iss: "https://login.microsoftonline.com/22222222-2222-2222-2222-222222222222/v2.0",
	sub: "john@example.com",
	roles: ["user"],
	scp: ["api://counter-service/increase", "api://value-service/read"],
	exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
};

const janeToken = {
	aud: "11111111-1111-1111-1111-111111111111", // Counter Service clientId
	iss: "https://login.microsoftonline.com/22222222-2222-2222-2222-222222222222/v2.0",
	sub: "jane@example.com",
	roles: ["admin"],
	scp: [
		"api://counter-service/increase",
		"api://counter-service/decrease",
		"api://value-service/read",
		"api://value-service/write",
	],
	exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
};

async function testCounterService() {
	const counterService = new CounterService();

	console.log("Testing with John (regular user):");
	try {
		// John can increase the value
		await counterService.increaseValue(JSON.stringify(johnToken));
		console.log("✓ John successfully increased the value");

		// John can read the value
		const value1 = await counterService.getValue(JSON.stringify(johnToken));
		console.log(`✓ John successfully read the value: ${value1}`);

		// John cannot decrease the value (admin only)
		await counterService.decreaseValue(JSON.stringify(johnToken));
		console.log("✗ John should not be able to decrease the value");
	} catch (error: unknown) {
		console.log(
			`✓ Expected error for John: ${error instanceof Error ? error.message : String(error)}`,
		);
	}

	console.log("\nTesting with Jane (admin):");
	try {
		// Jane can increase the value
		await counterService.increaseValue(JSON.stringify(janeToken));
		console.log("✓ Jane successfully increased the value");

		// Jane can read the value
		const value2 = await counterService.getValue(JSON.stringify(janeToken));
		console.log(`✓ Jane successfully read the value: ${value2}`);

		// Jane can decrease the value
		await counterService.decreaseValue(JSON.stringify(janeToken));
		console.log("✓ Jane successfully decreased the value");

		// Final value check
		const finalValue = await counterService.getValue(JSON.stringify(janeToken));
		console.log(`Final value: ${finalValue}`);
	} catch (error: unknown) {
		console.log(
			`Unexpected error for Jane: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}

testCounterService().catch(console.error);
