import iStaticPage, { component, prop, system } from 'super/i-static-page/i-static-page';
import { INode } from 'base/b-node/interface';

export * from 'super/i-static-page/i-static-page';

@component({root: true})
export default class pRoot extends iStaticPage {
	@prop(Object)
	content: INode[] = require('data/content.json');

	@system()
	schema: Dictionary = require('data/schema.json');

	getKey(path: string) {
		const chain = path.split('/');
		let value: CanUndef<any> = this.schema;

		do {
			const key = chain.shift();

			if (key == null || !value) {
				return null;
			}

			value = value[key];
		} while (chain.length && value != null);

		return value;
	}

	getValue(path: string[], source: INode[] = this.content): Nullable<INode> {
		let
			target: any = source;

		for (const key of path) {
			if (target[key] != null) {
				target = target[key];
			} else {
				return null;
			}
		}

		return target;
	}

	setValue(path: string[], value: any): void {
		path = [...path];

		let
			target: any = this.content,
			targetKey = path.pop();

		for (const key of path) {
			if (target[key]) {
				target = target[key];
			}
		}

		if (target && targetKey != null) {
			target[targetKey] = value;
		}
	}

	moveNode(source: INode[], currentPath: string[], newPath: string[], copy: boolean = false): void {
		newPath = [...newPath];
		const node = this.getValue(currentPath, source);

		const position = newPath.pop();
		const target = this.getValue(newPath) as Nullable<any[]>;

		if (Object.isNumber(position) && target) {
			if (!copy) {
				this.setValue(currentPath, null);
			}

			target.splice(position, 0, Object.fastClone(node));
		}

		this.forceUpdate();
	}

	deleteNode(path: string[]): void {
		this.setValue(path, null);
		this.forceUpdate();
	}

	copyNode(path: string[]): void {
		this.moveNode(this.content, path, path, true)
	}


	addNode(source: INode[], currentPath: string[]): void {
		const node = Object.fastClone(this.getValue(currentPath, source)) as INode;
		this.content.push(node);
	}
}
