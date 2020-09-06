/**
 * [[include:base/b-node/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, prop, computed, field, watch } from 'super/i-block/i-block';
import { INode } from "base/b-node/interface";
import bContent from "base/b-content/b-content";

export * from 'super/i-block/i-block';

/**
 * BNode
 */
@component()
export default class bNode extends iBlock {
	/** @override */
	readonly Root!: any;

	@prop(Object)
	data!: INode;

	@prop(String)
	childrenKey: string = 'params.content';

	@prop(String)
	paramsKey: string = 'params';

	@prop(Array)
	path!: string[];

	@prop(Boolean)
	static: boolean = false;

	@computed({dependencies: ['data', 'childrenKey']})
	get children(): INode[] {
		return this.field.get<INode[]>(`data.${this.childrenKey}`) ?? [];
	}

	@computed({dependencies: ['data', 'paramsKey']})
	get params(): Nullable<INode['params']> {
		return this.field.get<INode['params']>(`data.${this.paramsKey}`) || null;
	}

	@computed({dependencies: ['data']})
	get name(): string {
		return this.field.get<string>(`data.params.slug`) || '';
	}

	@computed({dependencies: ['data']})
	get type(): string {
		return this.field.get<string>(`data.component`) || '';
	}

	@field()
	showParams: boolean = false;

	toggleParams() {
		this.showParams = !this.showParams;
	}

	private separator: Nullable<HTMLElement> = null;

	onDragStart() {
		window.addEventListener('mouseup', this.onDragEnd);
		window.addEventListener('mousemove', this.onDrag);

		this.showParams = false;
		this.separator = document.createElement('div');

		this.separator.classList.add(this?.block?.getFullElName('separator') ?? '');
		this.r.lock();
	}

	onDragEnd(e: MouseEvent) {
		this.applyForNode(e, e.target as HTMLElement, (ctx, path) => {
			this.proxyEvent('move', this.data, this.path, path, this.static || e.shiftKey);
		});

		window.removeEventListener('mouseup', this.onDragEnd);
		window.removeEventListener('mousemove', this.onDrag);

		this.separator?.remove();
		this.separator = null;
		this.r.unlock();
	}

	onDrag(e: MouseEvent): void {
		e.preventDefault();
		this.applyForNode(e, e.target as HTMLElement, () => {});
	}

	private applyForNode(e: MouseEvent, target: Nullable<HTMLElement>, func: (ctx: bNode, path: string[]) => void) {
		if (!this.separator) {
			return;
		}

		do {
			if (target?.component?.componentName === 'b-node' && target?.component !== this && !target.component.static) {
				const
					bound = target.getBoundingClientRect(),
					pn = target.parentElement as HTMLElement,
					path = [...target.component.path];

				if (e.clientY < bound.y + bound.height / 2) {
					pn.insertBefore(this.separator, target);
					func(target.component, path);
				} else {
					const next = target.nextElementSibling as HTMLElement;
					path[path.length - 1] = path[path.length - 1] + 1;

					if (next) {
						pn.insertBefore(this.separator, next);
						func(target.component, path);
					} else {
						pn.appendChild(this.separator);
						func(target.component, path);
					}
				}

				break;
			}

			target = target?.parentElement;
		} while (target && target !== document.body);
	}

	proxyEvent(event: string, ...args: any) {
		this.$parent?.emit(event, ...args);
	}
}
