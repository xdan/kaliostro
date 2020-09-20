import type { Schema, SchemaItem, SchemaRef } from "pages/p-root/modules/interface"

const schema: Schema = require('data/schema.json');

export function resolveRef(item: SchemaRef | SchemaItem): SchemaItem {
	if (Object.isString(item['$ref'])) {
		const parts = item['$ref'].substr(2).split('/');
		return Object.get(schema, parts.join('.')) as SchemaItem;
	}

	return item as SchemaItem;
}

export function setKey(path: string, item: SchemaItem): void {
	const def = getKey(path, schema);
	const chain = path.substr(2).split('/').join('.');
	def && Object.set(item, chain, def);
}

export function getKey(path: string, value: any = schema): Nullable<SchemaItem> {
	const chain = path.substr(2).split('/');

	do {
		const key = chain.shift();

		if (key == null || !value) {
			return null;
		}

		value = value[key];
	} while (chain.length && value != null);

	return value;
}

export function expand(item: SchemaItem, excludeKeys: string[] = ['content']): SchemaItem | SchemaItem[] {
	return item && Object.keys(item).reduce((acc, field) => {
		if (excludeKeys.includes(field)) {
			return acc;
		}

		if (Array.isArray(item[field]) || Object.isPlainObject(item[field])) {
			acc[field] = expand(item[field]);
		} else {
			if (field === '$ref') {
				const refNode = getKey(item[field]);

				if (refNode) {
					Object.assign(acc, expand(refNode));
				}
			} else {
				acc[field] = item[field];
			}
		}

		return acc;
	}, Array.isArray(item) ? <SchemaItem[]>[] : <SchemaItem>{});
}

export function fastCompare(x: unknown, y: unknown) {
	if (x === y) {
		return true;
	}
	// if both x and y are null or undefined and exactly the same

	if (!(x instanceof Object) || !(y instanceof Object)) {
		return false;
	}
	// if they are not strictly equal, they both need to be Objects

	if (x.constructor !== y.constructor) {
		return false;
	}
	// they must have the exact same prototype chain, the closest we can do is
	// test there constructor.

	for (var p in x) {
		if (!x.hasOwnProperty(p)) {
			continue;
		}
		// other properties were tested using x.constructor === y.constructor

		if (!y.hasOwnProperty(p)) {
			return false;
		}
		// allows to compare x[ p ] and y[ p ] when set to undefined

		if (x[p] === y[p]) {
			continue;
		}
		// if they have the same strict value or identity then they are equal

		if (typeof (x[p]) !== "object") {
			return false;
		}
		// Numbers, Strings, Functions, Booleans must be strictly equal

		if (!fastCompare(x[p], y[p])) {
			return false;
		}
		// Objects and Arrays must be tested recursively
	}

	for (p in y) {
		if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
			return false;
		}
	}
	// allows x[ p ] to be set to undefined

	return true;
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

	getSchema(path: string): Nullable<SchemaItem | SchemaItem[]> {
		const item = getKey(path);
		return item && expand(item);
	}
}
