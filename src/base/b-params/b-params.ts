/**
 * [[include:base/b-params/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, prop } from 'super/i-block/i-block';
import iRoot from 'pages/p-root/p-root';
import {SchemaItem} from "pages/p-root/modules/interface";

export * from 'super/i-block/i-block';

interface IRenderInput extends SchemaItem {
	key: string;
}

/**
 * BParams
 */
@component()
export default class bParams extends iBlock {
	/** @override */
		// @ts-ignore
	readonly Root!: iRoot;

	@prop(String)
	type!: string;

	@prop(Array)
	path!: string[];

	@prop(Object)
	params: Dictionary = {};

	@prop(Function)
	proxyEvent!: Function;

	get properties(): IRenderInput[] {
		const
			item = this.r.getKey('#/definitions/' + this.type),
			props: IRenderInput[] = [];

		if (item) {
			const
				params = this.r.resolver.getProperties(item).params,
				ownParams = params ? this.r.resolver.getProperties(params) : null;

			ownParams && Object.keys(ownParams).forEach((key) => {
				const node = ownParams[key];

				node && props.push({
					key,
					...node
				});
			})
		}

		return props;
	}

	onChange(key: string, value: string): void {
		this.proxyEvent('set-value', this.path.concat([key]), value);
	}
}
