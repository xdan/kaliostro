import iBlock, { component, prop, watch } from 'super/i-block/i-block';
import { INode } from "base/b-node/interface";
export * from 'super/i-block/i-block';

@component()
export default class bContent extends iBlock {
	/** @override */
	readonly Root!: any;

	@prop(Array)
	content!: INode[];

	@prop(Array)
	path!: string[];

	@prop(Boolean)
	static:boolean = false;

	@watch('?event:onMove')
	onMove(path: string[], newPath: string[], copy: boolean): void {
		this.r.moveNode(this.content, path, newPath, copy)
	}

	@watch('?event:onDelete')
	onDelete(path: string[]): void {
		this.r.deleteNode(path)
	}

	@watch('?event:onCopy')
	onCopy(path: string[]): void {
		this.r.copyNode(path)
	}

	@watch('?event:onAdd')
	onAdd(path: string[]): void {
		this.r.addNode(this.content, path)
	}
}
