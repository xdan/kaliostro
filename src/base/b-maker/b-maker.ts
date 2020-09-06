/**
 * [[include:base/b-maker/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, system, ModsDecl, prop } from 'super/i-block/i-block';

export * from 'super/i-block/i-block';

/**
 * BMaker
 */
@component({functional: true})
export default class bMaker extends iBlock {
	@prop(Array)
	path: string[] = [];

	/** @inheritDoc */
	static readonly mods: ModsDecl = {
		show: [
			'true	',
			['false']
		],
	}

	@system()
	defaultParams: Dictionary[] = require('data/default.json');

	toggleDropDown() {
		this.setMod('show', !(this.mods.show === 'true'));

		if (this.mods.show === 'true') {
			window.addEventListener('mouseup', this.onHide);
		}
	}

	onHide(): void {
		this.setMod('show', false);
		window.removeEventListener('mouseup', this.onHide);
	}
}
