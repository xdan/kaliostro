import iStaticPage, { component, field, system } from 'super/i-static-page/i-static-page';
import { INode } from 'base/b-node/interface';
import { resolveRef } from 'pages/p-root/modules/schema';
import bDialog from "base/dialogs/b-dialog/b-dialog";
import {SchemaItem, SchemaRef} from "pages/p-root/modules/interface";

export * from 'super/i-static-page/i-static-page';

@component({root: true})
export default class pRoot extends iStaticPage {
	readonly $refs!: iStaticPage["$refs"] & {
		dialog: bDialog;
	};

	@field()
	content: INode[] = require('data/content.json');

	@system()
	schema = require('data/schema.json');

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
	}

	deleteNode(path: string[]): void {
		this.setValue(path, null);
	}

	copyNode(path: string[]): void {
		const node = this.getValue(path);
		node && this.moveNode(node, path, path, true)
	}


	addNode(node: INode, currentPath: string[]): void {
		let target = this.getValue(currentPath) as Nullable<any[]>;

		if (!target) {
			this.setValue(currentPath, [node])
			this.forceUpdate();
		} else {
			Object.isArray(target) && target.push(node);
		}
	}

	lock(): void {
		this.setMod('lock', true);
	}

	unlock(): void {
		this.setMod('lock', false);
	}

	resolveRef(item: SchemaRef | SchemaItem): SchemaItem {
		return resolveRef(item);
	}
}
