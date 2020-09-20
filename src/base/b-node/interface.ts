export interface INode {
	component: string;
	params?: {
		content?: INode[];
	}
}

export type INodes = INode[];
