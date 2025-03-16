import type { Diagnostic, JSXAttribute, Node } from "@biomejs/biome";

interface Expression extends Node {
	type: string;
}

interface CallExpression extends Node {
	type: "CallExpression";
	callee: {
		type: string;
		name?: string;
	};
}

const isFunctionProp = (name: string) => name.startsWith("on");

const isFunctionExpression = (expression: Expression) =>
	expression.type === "ArrowFunctionExpression" ||
	expression.type === "FunctionExpression";

const isWrappedInUseCallback = (node: Node): boolean => {
	let current = node;
	while (current.parent) {
		if (
			current.type === "CallExpression" &&
			(current as CallExpression).callee.type === "Identifier" &&
			(current as CallExpression).callee.name === "useCallback"
		) {
			return true;
		}
		current = current.parent;
	}
	return false;
};

export function useCallbackRule(): Diagnostic {
	return {
		name: "useCallbackForProps",
		description:
			"Enforce using useCallback for function props in React components",
		severity: "error",
		category: "correctness",
		test(node: Node) {
			if (node.type !== "JSXAttribute") {
				return false;
			}

			const jsxNode = node as JSXAttribute;
			if (!isFunctionProp(jsxNode.name.name)) {
				return false;
			}

			const value = jsxNode.value;
			if (!value || value.type !== "JSXExpressionContainer") {
				return false;
			}

			if (!isFunctionExpression(value.expression)) {
				return false;
			}

			return !isWrappedInUseCallback(node);
		},
		message: "Function prop '{{propName}}' should be wrapped in useCallback",
		data(node: JSXAttribute) {
			return {
				propName: node.name.name,
			};
		},
	};
}
