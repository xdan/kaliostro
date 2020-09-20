export interface Schema extends SchemaItem {
	"$schema": string;
	"service": string;
	"platform": string;
	"definitions": Dictionary<SchemaItem>
}

export interface SchemaRef {
	"$ref": string;
}

export interface SchemaItem {
	type: "object" | "array" | "boolean" | "string" | "number" | "integer" | "null";
	label?: string;
	items?: SchemaItem;
	oneOf?: SchemaItem[];
	anyOf?: SchemaItem[];
	allOf?: SchemaItem[];
	properties?: Dictionary<SchemaItem>;
}

export interface IRenderInput extends SchemaItem {
	key: string;
}
