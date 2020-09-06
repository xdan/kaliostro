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

	@watch('!:onMove')
	onMove(node: INode, path: string[], newPath: string[], copy: boolean): void {
		this.r.moveNode(node, path, newPath, copy);
		this.forceUpdate();
	}

	@watch('!:onDelete')
	onDelete(path: string[]): void {
		this.r.deleteNode(path);
		this.forceUpdate();
	}

	@watch('!:onCopy')
	onCopy(path: string[]): void {
		this.r.copyNode(path);
		this.forceUpdate();
	}

	@watch('!:onAdd')
	onAdd(node: INode): void {
		this.r.addNode(node, this.path);
		this.forceUpdate();
	}

	@watch('!:onSetValue')
	setValue(path: string[], value: any): void {
		this.r.setValue(path, value);
		this.forceUpdate();
	}
}
