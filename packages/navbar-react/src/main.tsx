import React from "react";
import reactDom from "react-dom/client";
import { NavBar } from "./NavBar.tsx";

const root = document.getElementById("root");
if (!root) {
	throw new Error("Root element not found");
}

reactDom.createRoot(root).render(
	<React.StrictMode>
		<NavBar title="React Navbar Demo" />
	</React.StrictMode>,
);
