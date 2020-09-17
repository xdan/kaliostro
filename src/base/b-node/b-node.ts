/**
 * [[include:base/b-node/README.md]]
 * @packageDocumentation
 */
import Ajv from 'ajv';
import localize from 'ajv-i18n/localize/ru';
import symbolGenerator from 'core/symbol';
import iBlock, {component, prop, computed, field, hook} from 'super/i-block/i-block';
import {INode} from "base/b-node/interface";

export const
	$$ = symbolGenerator();

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

	@hook('mounted')
	onReady(): void {
		this.setMod('child', this.path.length > 1)
	}

	toggleParams() {
		this.showParams = !this.showParams;
	}

	private separator: Nullable<HTMLElement> = null;
	private draggable: Nullable<HTMLElement> = null;

	protected async onDragStart(): Promise<void> {
		this.async.on(window, 'mouseup', this.onDragEnd, {
			group: $$.bNodeMouse
		})
		this.async.on(window, 'mousemove', this.onDrag.throttle(50), {
			group: $$.bNodeMouse
		})

		this.showParams = false;

		await this.r.nextTick();

		this.separator = document.createElement('div');

		this.separator.classList.add(this?.block?.getFullElName('separator') ?? '');

		this.draggable = this.$el?.cloneNode(true) as Nullable<HTMLElement>;

		if (this.draggable) {
			this.draggable.style.width = (this.$el?.clientWidth ?? 300) + 'px';
			document.body.appendChild(this.draggable);
			this.setDummyPosition();
		}

		this.r.lock();
	}

	private setDummyPosition(e?: MouseEvent): void {
		if (this.draggable) {
			Object.assign(this.draggable.style, {
				position: 'fixed',
				backgroundColor: '#fff',
				top: e ? (e.clientY + 10) + 'px' : 0,
				display: e ? 'block' : 'none'
			});
		}
	}

	private onDragEnd(e: MouseEvent): void {
		this.applyForNode(e, e.target as HTMLElement, (ctx, path) => {
			this.proxyEvent('move', this.data, this.path, path, this.static || e.shiftKey);
		});

		this.async.off({
			group: $$.bNodeMouse
		});

		this.separator?.remove();
		this.draggable?.remove();
		this.separator = null;
		this.r.unlock();
	}

	private onDrag(e: MouseEvent): void {
		this.applyForNode(e, e.target as HTMLElement, () => {
		});
		this.setDummyPosition(e);
	};

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

	proxyEvent(event: string, ...args: any): void {
		this.$parent?.emit(event, ...args);
	}

	openEditDialog() {
		const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
		const validate = ajv.compile(this.r.schema);

		this.r.$refs.dialog.open(
			JSON.stringify(Object.fastClone(this.data), null, "\t"),
			(value: string): void => {
				this.proxyEvent('set-value', this.path, JSON.parse(value));
			}, (value: string) => {
				try {
					const valid = validate([JSON.parse(value)]);

					if (!valid && validate.errors) {
						localize(validate.errors);
						return Array.from(validate.errors.reduce((acc, item) => {
							const message: string[] = [];

							message.push(item.dataPath.replace('[0]', 'node'));
							if (item.message) {
								if (item.message.includes('hould match exactly one schema in oneOf')) {
									return acc;
								}

								message.push(item.message);
							}

							const allowedValues = this.field.get<string[]>('params.allowedValues', item);
							if (allowedValues) {
								message.push(allowedValues.toString())
							}

							acc.add(message.join(' - '));

							return acc;
						}, new Set<string>())).join('\n');
					}
				} catch (e) {
					return e.message;
				}

				return 'valid';
			}
		)
	}
}
