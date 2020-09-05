export interface INode {
	component: string;
	params?: {
		content?: INode[];
	}
}
