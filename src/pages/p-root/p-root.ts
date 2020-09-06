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

	getValue(path: string[], source: INode[] = this.content): Nullable<any> {
		if (path.length === 0) {
			return source;
		}

		return this.field.get<INode>(path.join('.'), source);
	}

	setValue(path: string[], value: any): void {
		this.field.set(['content', ...path].join('.'), value);
	}

	moveNode(node: INode, currentPath: string[], newPath: string[], copy: boolean = false): void {
		newPath = [...newPath];

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
		const node = this.getValue(path);
		node && this.moveNode(node, path, path, true)
	}


	addNode(node: INode, currentPath: string[]): void {
		let target = this.getValue(currentPath) as Nullable<any[]>;

		if (!target) {
			this.setValue(currentPath, [node])

		} else {
			Object.isArray(target) && target.push(node);
		}

		this.forceUpdate();
	}

	lock(): void {
		this.setMod('lock', true);
	}

	unlock(): void {
		this.setMod('lock', false);
	}
}
