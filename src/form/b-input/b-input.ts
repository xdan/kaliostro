/**
 * [[include:form/b-input/README.md]]
 * @packageDocumentation
 */

import iInput, { component, prop, system } from 'super/i-input/i-input';

export * from 'super/i-block/i-block';

/**
 * BInput
 */
@component({functional: true})
export default class bInput extends iInput {
	/**
	 * Input type
	 */
	@prop(String)
	readonly type: string = 'text';

	@system()
	lastValue!: this['value'];

	onInput(event: KeyboardEvent): void {
		this.value = (<HTMLInputElement>event.target).value;
	}

	onBlur(): void {
		if (this.lastValue !== this.value) {
			this.emit('change', this.name, this.value);
		}
	}

	onFocus(): void {
		this.lastValue = this.value;
	}
}
