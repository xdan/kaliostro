/**
 * [[include:form/b-button/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, watch, prop } from 'super/i-block/i-block';

export * from 'super/i-block/i-block';

/**
 * BButton
 */
@component({functional: true})
export default class bButton extends iBlock {
	@prop(String)
	type: string = 'default'

	@prop(String)
	size: 'small' | 'large' = 'small'

	@watch('?$el:click')
	protected onClick(): void {
		this.emit('click');
	}
}
