import type { FC } from "react";

interface NavBarProps {
	title?: string;
}

export const NavBar: FC<NavBarProps> = ({ title = "Eltrue" }) => {
	return (
		<nav
			style={{
				backgroundColor: "#333",
				padding: "1rem",
				color: "white",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{title}</div>
			<div style={{ display: "flex", gap: "1rem" }}>
				<a href="/" style={{ color: "white", textDecoration: "none" }}>
					Home
				</a>
				<a href="/about" style={{ color: "white", textDecoration: "none" }}>
					About
				</a>
				<a href="/contact" style={{ color: "white", textDecoration: "none" }}>
					Contact
				</a>
			</div>
		</nav>
	);
};
