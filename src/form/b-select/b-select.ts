/**
 * [[include:form/b-select/README.md]]
 * @packageDocumentation
 */

import iInput, { prop, component, computed } from "super/i-input/i-input";

export * from 'super/i-block/i-block';

/**
 * BSelect
 */
@component({functional: true})
export default class bSelect extends iInput {
	/**
	 * A drop-down list that allows multiple selections
	 */
	@prop(Boolean)
	multiple: boolean = false;

	/**
	 * Active rows
	 */
	@prop(Number)
	size: number = 1;

	/**
	 * Defines an option in a select list
	 */
	@prop(Array)
	options: string[] = [];

	/**
	 * Array of selected values
	 */
	@computed({dependencies: ['value']})
	get values(): string[] {
		return this.value.split(',').map(a => a.trim());
	}

	/**
	 * Handler: selected value was changed
	 *
	 * @param event
	 * @emits change(string)
	 */
	onChange(event: InputEvent): void {
		this.emit('change', (<HTMLInputElement>event.target)?.value);
	}
}
