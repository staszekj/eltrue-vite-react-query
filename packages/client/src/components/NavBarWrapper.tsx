import { useEffect, useState } from "react";
import type { ComponentType } from "react";

interface NavBarWrapperProps {
	type: "react" | "webcomponent";
	title?: string;
}

interface NavBarProps {
	title?: string;
}

export function NavBarWrapper({ type, title = "Eltrue" }: NavBarWrapperProps) {
	const [NavBarComponent, setNavBarComponent] =
		useState<ComponentType<NavBarProps> | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const loadNavBar = async () => {
			try {
				if (type === "react") {
					const module = await import("navbarReact/NavBar");
					// @ts-ignore
					setNavBarComponent(module.NavBar);
				}
				setIsLoaded(true);
			} catch (error) {
				console.error("Failed to load navbar:", error);
			}
		};

		loadNavBar();
	}, [type]);

	if (!isLoaded) {
		return <div>Loading navbar...</div>;
	}

	if (type === "webcomponent") {
		// @ts-ignore
		return <eltrue-navbar title={title} />;
	}

	if (NavBarComponent) {
		return <NavBarComponent title={title} />;
	}

	return <div>Failed to load navbar</div>;
}
