import { AbstractIconLib } from '@json-editor/json-editor/src/iconlib';
import iconsStore from "base/utils/b-icon/modules/icons";

const defaultMapping = { collapse: 'chevron-up', expand: 'chevron-right', delete: 'trash', edit: 'pencil', add: 'plus', cancel: '', save: '', moveup: 'arrow-up', movedown: 'arrow-down' }

export class UIKitIcons extends AbstractIconLib {
	constructor(iconPrefix = '', mapping = defaultMapping) {
		super(iconPrefix, mapping);
	}
	getIcon (key) {
		const i = document.createElement('i');

		if (defaultMapping[key]) {
			key = defaultMapping[key];
		}

		if (iconsStore[key]) {
			i.innerHTML = iconsStore[key];
		}

		return i
	}
}
