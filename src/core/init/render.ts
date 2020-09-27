import Component, {rootComponents} from 'core/component';

interface Options {
	onInput: (json: string) => string
	onOutput: (json: string) => string
	previewUrl?: string;
}

/**
 * Draw Kaliostro after selector
 *
 * @param selector
 * @param options
 */
export async function renderTo(
	selector: string | HTMLElement,
	options: Options = {
		onInput: (s) => s,
		onOutput: (s) => s,
	}
): Promise<Component> {
	const
		area = selector instanceof HTMLElement ? selector : document.querySelector<HTMLElement>(selector);

	if (!area) {
		throw new ReferenceError('The root node is not found');
	}

	const areaProxy = {
		get value(): string {
			return area instanceof HTMLTextAreaElement ? area.value || '[]' : '[]'
		},

		set value(value: string) {
			if (area instanceof HTMLTextAreaElement) {
				area.value = value;
			}
		}
	};

	const div = document.createElement('div');
	area.parentElement?.insertBefore(div, area);
	area.style.display = 'none';

	const
		params: Dictionary<any> & Options = Object.mixin(true, {}, {"data": {}}, options),
		{onInput, onOutput} = params;

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

	try {
		const json = JSON.parse(onInput(areaProxy.value));
		Object.set(component, 'props.contentProp.default', json);
	} catch (e) {
		console.error(e);
	}

	Object.set(component, 'props.onChangeContent.default', (value: string) => {
		areaProxy.value = onOutput(value);

		const fire = (eventName: string) => {
			const evt = document.createEvent("HTMLEvents");
			evt.initEvent(eventName, false, true);
			area.dispatchEvent(evt);
		};

		fire('change');
		fire('input');
	});

	if (params.previewUrl != null) {
		Object.set(component, 'props.previewUrl.default', params.previewUrl);
	}

	return new Component({
		...params,
		...component,
		el: div
	});
}
