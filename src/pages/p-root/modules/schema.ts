import type { Schema, SchemaItem, SchemaRef } from "pages/p-root/modules/interface"
const schema: Schema = require('data/schema.json');

export function resolveRef(item: SchemaRef | SchemaItem): SchemaItem {
	if (Object.isString(item['$ref'])) {
		const parts = item['$ref'].substr(2).split('/');
		return Object.get(schema, parts.join('.')) as SchemaItem;
	}

	return item as SchemaItem;
}

export function getKey(path: string): Nullable<SchemaItem> {
	const chain = path.substr(2).split('/');
	let value: CanUndef<any> = schema;

	do {
		const key = chain.shift();

		if (key == null || !value) {
			return null;
		}

		value = value[key];
	} while (chain.length && value != null);

	return value;
}

export class SchemaResolver {
	getProperties(node: SchemaItem): Dictionary<SchemaItem> {
		const props = node.properties ?? Object.createDict();

		if (node.allOf) {
			node.allOf.forEach(elm => {
				Object.mixin(true, props, this.getProperties(resolveRef(elm)));
			});
		}

		return props;
	}
}
