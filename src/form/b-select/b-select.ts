/**
 * [[include:form/b-select/README.md]]
 * @packageDocumentation
 */

import iInput, { prop, component } from "super/i-input/i-input";

export * from 'super/i-block/i-block';

/**
 * BSelect
 */
@component({functional: true})
export default class bSelect extends iInput {
	@prop(String)
	value: string = '';

	@prop(Array)
	options: string[] = [];

	onChange(event: InputEvent): void {
		this.emit('change', (<HTMLInputElement>event.target)?.value);
	}
}
