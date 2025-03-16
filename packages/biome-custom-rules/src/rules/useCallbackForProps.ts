import type { Context, JSXNode, Rule } from "../types";

const useCallbackRule: Rule = {
	name: "useCallbackForProps",
	meta: {
		description:
			"Enforce using useCallback for function props in React components",
		docs: {
			description:
				"Function props passed to React components should be wrapped in useCallback to prevent unnecessary re-renders.",
			recommended: "error",
		},
		messages: {
			useCallbackRequired:
				"Function prop '{{propName}}' should be wrapped in useCallback",
		},
	},
	create(context: Context) {
		return {
			JSXAttribute(node: JSXNode) {
				// Only check props that are functions (starting with 'on')
				if (!node.name.name.startsWith("on")) {
					return;
				}

				// Check if the value is an arrow function or function expression
				const value = node.value;
				if (!value || value.type !== "JSXExpressionContainer") {
					return;
				}

				const expression = value.expression;
				if (
					expression.type !== "ArrowFunctionExpression" &&
					expression.type !== "FunctionExpression"
				) {
					return;
				}

				// Check if the function is wrapped in useCallback
				let isWrappedInUseCallback = false;
				let current: JSXNode | undefined = node;
				while (current?.parent) {
					if (
						current.type === "CallExpression" &&
						current.name?.name === "useCallback"
					) {
						isWrappedInUseCallback = true;
						break;
					}
					current = current.parent;
				}

				if (!isWrappedInUseCallback) {
					context.report({
						node,
						messageId: "useCallbackRequired",
						data: {
							propName: node.name.name,
						},
					});
				}
			},
		};
	},
};

export default useCallbackRule;
