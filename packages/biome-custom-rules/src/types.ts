export interface Context {
	report(params: {
		node: unknown;
		messageId: string;
		data?: Record<string, string>;
	}): void;
}

export interface JSXNode {
	type: string;
	name: {
		name: string;
	};
	value?: {
		type: string;
		expression: {
			type: string;
			name?: string;
		};
	};
	parent?: JSXNode;
}

export interface Rule {
	name: string;
	meta: {
		description: string;
		docs: {
			description: string;
			recommended: string;
		};
		messages: Record<string, string>;
	};
	create(context: Context): {
		[key: string]: (node: JSXNode) => void;
	};
}
