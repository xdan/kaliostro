/**
 * [[include:form/b-select/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, prop } from 'super/i-block/i-block';

export * from 'super/i-block/i-block';

/**
 * BSelect
 */
@component({functional: true})
export default class bSelect extends iBlock {
	@prop(Array)
	path!: string[];

	@prop(String)
	value: string = '';

	@prop(Array)
	options: string[] = [];

	onChange(event: InputEvent): void {
		this.emit('change', this.path, (<HTMLInputElement>event.target)?.value);
	}
}
