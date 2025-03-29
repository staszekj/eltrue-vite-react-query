import { useState } from "react";
import { NavBarWrapper } from "./components/NavBarWrapper";

export function App() {
	const [navbarType, setNavbarType] = useState<"react" | "webcomponent">(
		"react",
	);

	return (
		<div>
			<div style={{ marginBottom: "1rem" }}>
				<button
					type="button"
					onClick={() => setNavbarType("react")}
					style={{ marginRight: "1rem" }}
				>
					React Navbar
				</button>
				<button type="button" onClick={() => setNavbarType("webcomponent")}>
					Web Component Navbar
				</button>
			</div>
			<NavBarWrapper type={navbarType} title="Eltrue Demo" />
			<main style={{ padding: "2rem" }}>
				<h1>Welcome to Eltrue Demo</h1>
				<p>This is a simple demo showing both navbar implementations.</p>
			</main>
		</div>
	);
}
