import { AbstractTheme } from '@json-editor/json-editor/src/theme';
import { h } from "core/helpers/h";
import iconsStore from "base/utils/b-icon/modules/icons";

export class UIKitTheme extends AbstractTheme {
	static rules = {
		".has-error": 'font-size: 12px',
		"button.ko-json-button": 'padding: 0 4px;line-height:20px;font-size:10px;',
		".ko-json-button svg": 'width: 16px; height: 16px',
		".ko-json-button path,.ko-json-button polyline,.ko-json-button line": 'stroke: white',
		".ko-json-button rect, polygon": 'fill: white',
		".form-control": 'padding-bottom: 8px;',
		".uk-form-small:not(textarea):not([multiple]):not([size])": 'line-height: 28px',
		".uk-form__control-box": 'display: flex;',
		".uk-tooltip-custom": 'font-family: sans-serif;' +
			'visibility:hidden;' +
			'background-color: rgba(50, 50, 50, .75);' +
			'margin:0 .25rem;' +
			'color:#FAFAFA;' +
			'padding:.5rem 1rem;' +
			'border-radius:.25rem;' +
			'width:25rem;' +
			'transform:translateX(-27rem) translateY(-.5rem);' +
			'position:absolute;' +
			'line-height:1;',
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

	removeInputError(input: HTMLElement) {
		const field = input.parentElement;
		if (!field || !field.classList.contains('has-error')) {
			return;
		}

		field.classList.remove('has-error');
		field.querySelector('.uk-text-danger')?.remove();
	}

	getDescription (text) {
		const icon = document.createElement('span')

		icon.classList.add('uk-icon');
		icon.innerHTML = iconsStore['info'];

		icon.style.padding = '.25rem'
		icon.style.position = 'relative'
		icon.style.display = 'inline-block'

		const tooltip = document.createElement('span');
		tooltip.classList.add('uk-tooltip-custom')

		tooltip.innerText = text
		icon.onmouseover = () => {
			tooltip.style.visibility = 'visible'
		}
		icon.onmouseleave = () => {
			tooltip.style.visibility = 'hidden'
		}

		icon.appendChild(tooltip)

		return icon
	}

	getFormControl (label, input, description, infoText) {
		const el = document.createElement('div')
		el.classList.add('uk-form-control')
		if (label) el.appendChild(label)

		if ((input.type === 'checkbox' || input.type === 'radio') && label) {
			input.style.width = 'auto'
			label.insertBefore(input, label.firstChild);
			if (infoText) {
				label.appendChild(infoText);
			}
			if (description) {
				el.appendChild(description)
			}

		} else {
			const box = document.createElement('div');
			box.classList.add('uk-form__control-box');
			el.appendChild(box)

			if (infoText && label) {
				label.appendChild(infoText)
			}

			box.appendChild(input);
			if (description) {
				box.appendChild(description)
			}
		}

		return el
	}
}
