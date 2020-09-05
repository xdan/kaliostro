/**
 * [[include:base/b-params/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, prop } from 'super/i-block/i-block';

export * from 'super/i-block/i-block';

/**
 * BParams
 */
@component()
export default class bParams extends iBlock {
	@prop(Array)
	path!: string[];

	@prop(Object)
	params: Dictionary = {};
}
