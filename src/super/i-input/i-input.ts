import iBlock, { component, prop, field } from 'super/i-block/i-block';

export * from 'super/i-block/i-block';

/**
 * BSelect
 */
@component({functional: true})
export default class iInput extends iBlock {
	@prop(String)
	label: string = '';

	/** @override */
	@prop({type: String, required: false})
	readonly valueProp?: string;

	@field((o) => o.sync.link())
	value!: string;

	/**
	 * Input name
	 */
	@prop(String)
	readonly name!: string;
}
