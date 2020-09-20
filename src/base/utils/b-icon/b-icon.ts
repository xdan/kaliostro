/**
 * [[include:base/utils/b-icon/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, prop, watch } from 'super/i-block/i-block';
import iconsStore from "base/utils/b-icon/modules/icons";

export * from 'super/i-block/i-block';

const iconToCursor = {
	grid: 'grab',
	'chevron-left': 'pointer',
	'chevron-down': 'pointer',
}



/**
 * BIcon
 */
@component({functional: true})
export default class bIcon extends iBlock {
	/** @inheritDoc */
	static readonly mods = {
		button: [
			'true',
			['false']
		],
	};

	@prop(String)
	icon!: string;

	@prop(Number)
	size: number = 24;

	get cursor(): string {
		const byPreset = iconToCursor[this.icon];

		if (byPreset) {
			return byPreset;
		}

		return  this.mods.button === 'true' ? 'pointer' : 'default';
	}

	get svg(): string {
		return iconsStore[this.icon] || ''
	}

	@watch('?$el:click')
	protected onClick(): void {
		this.emit('click');
	}

	@watch('?$el:mousedown')
	protected onDragStart(e: MouseEvent): void {
		this.emit('dragStart');
		e.preventDefault();
	}
}
