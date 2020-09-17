import 'core/init/state';
import 'core/init/abt';
import 'core/init/prefetch';

import Component, { rootComponents } from 'core/component';

window.v4fire = {
	async renderTo(selector: string, params = {"data":{}}): Promise<Component> {
		const
			node = document.querySelector<HTMLElement>(selector);

		if (!node) {
			throw new ReferenceError('The root node is not found');
		}

		const
			name = 'p-root',
			component = await rootComponents[name];

		if (!component) {
			throw new ReferenceError('The root component is not found');
		}

		const
			getData = component.data;

		component.data = function data(this: unknown): Dictionary {
			return Object.assign(Object.isFunction(getData) ? getData.call(this) : {}, params.data);
		};

		return new Component({
			...params,
			...component,
			el: node
		});
	}
};
