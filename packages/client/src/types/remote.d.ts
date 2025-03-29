declare module "navbarReact/NavBar" {
	export const NavBar: React.ComponentType<{ title?: string }>;
}

declare module "navbarWebComponent/NavBar" {
	export const NavBar: React.ComponentType<{ title?: string }>;
}

declare namespace jsx {
	interface IntrinsicElements {
		"eltrue-navbar": React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLElement> & { title?: string },
			HTMLElement
		>;
	}
}
