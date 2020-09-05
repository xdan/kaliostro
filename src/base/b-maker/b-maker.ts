/**
 * [[include:base/b-maker/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, field } from 'super/i-block/i-block';

export * from 'super/i-block/i-block';

/**
 * BMaker
 */
@component()
export default class bMaker extends iBlock {
	@field()
	showDropDown: boolean = false;

	@field()
	defaultParams: Dictionary[] = require('data/default.json');

	toggleDropDown() {
		this.showDropDown = !this.showDropDown;

		if (this.showDropDown) {
			window.addEventListener('mouseup', this.onHide);
		}
	}

	onHide(): void {
		this.showDropDown = false;
		window.removeEventListener('mouseup', this.onHide);
	}

	ttt() {
		alert(222);
	}
}
