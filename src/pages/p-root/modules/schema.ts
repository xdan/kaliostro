import type { Schema, SchemaItem, SchemaRef } from "pages/p-root/modules/interface"
const schema: Schema = require('data/schema.json');

export function resolveRef(item: SchemaRef | SchemaItem): SchemaItem {
	if (Object.isString(item['$ref'])) {
		const parts = item['$ref'].substr(2).split('/');
		return Object.get(schema, parts.join('.')) as SchemaItem;
	}

	return item as SchemaItem;
}
