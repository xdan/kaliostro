import { AbstractTheme } from '@json-editor/json-editor/src/theme';
import { h } from "core/helpers/h";

export class UIKitTheme extends AbstractTheme {
	static rules = {
		".has-error": 'font-size: 12px',
		"button.ko-json-button": 'padding: 0 4px;line-height:20px;font-size:10px;',
		".ko-json-button svg": 'width: 16px; height: 16px',
		".ko-json-button path,.ko-json-button polyline,.ko-json-button line": 'stroke: white',
		".ko-json-button rect, polygon": 'fill: white',
		".form-control": 'padding-bottom: 8px;',
	};

	constructor(jsoneditor) {
		super(jsoneditor, {
			disable_theme_rules: false
		});
	}

	getFormInputLabel(text, req) {
		const label = super.getFormInputLabel(h(text), req);
		label.classList.add('uk-form-label');
		return label;
	}

	getSelectInput(options, multiple): HTMLSelectElement {
		const select = super.getSelectInput(options, multiple);
		select.classList.add('uk-select', 'uk-form-small');
		return select;
	}

	setSelectOptions (select, options, titles = []) {
		super.setSelectOptions(select, options, titles.map(h));
	}

	getButton(text?: string, icon?: string, title?: string) {
		const el = super.getButton(text?.toLowerCase() !== 'item' ? text : '', icon, title)
		el.classList.add('uk-button', 'uk-button-primary' , 'uk-button-small', 'ko-json-button');
		return el
	}

	getButtonHolder () {
		const el = document.createElement('span')
		el.classList.add('uk-button-group')
		return el
	}

	getTextareaInput() {
		const el = super.getTextareaInput('textarea');
		el.classList.add('uk-textarea')

		return el
	}

	getFormInputField(type) {
		const el = super.getFormInputField(type);
		el.classList.add('uk-input', 'uk-form-small')

		return el
	}

	addInputError (input: HTMLElement, text: string) {
		const field = input.parentElement;
		if (!field) {
			return;
		}

		this.removeInputError(input);

		field.classList.add('has-error');
		const errorBox = document.createElement('div');
		errorBox.classList.add('uk-text-danger');
		errorBox.innerText = text;
		field.appendChild(errorBox);
	}

	removeInputError (input: HTMLElement) {
		const field = input.parentElement;
		if (!field || !field.classList.contains('has-error')) {
			return;
		}

		field.classList.remove('has-error');
		field.querySelector('.uk-text-danger')?.remove();
	}
}
