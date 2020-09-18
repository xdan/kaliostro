/**
 * [[include:base/dialogs/b-dialog/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, system } from 'super/i-block/i-block';
import bButton from "form/b-button/b-button";
import symbolGenerator from 'core/symbol';

export const
	$$ = symbolGenerator();

export * from 'super/i-block/i-block';

declare const CodeMirror: any;

/**
 * BDialog
 */
@component({functional: true})
export default class bDialog extends iBlock {
	@system()
	private editor: any;

	protected readonly $refs!: iBlock['$refs'] & {
		textarea: HTMLTextAreaElement;
		errorBox: HTMLElement;
		dialog: HTMLElement;
		save: bButton;
	};

	open(value: string, clb: ((value: string) => void), validate: ((value: string) => any) = () => {}): void {
		this.$refs.dialog.style.display = 'block';

		this.$refs.textarea.value = value;

		const onChange = this.async.debounce(() => {
			this.$refs.errorBox.innerText = validate(this.$refs.textarea.value);
		}, 300);

		if (typeof CodeMirror !== 'undefined') {
			this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
				name: "javascript",
				json: true,
				lineNumbers: true,
				foldGutter: true,
				gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
			});

			this.editor.on('change', onChange);

		} else {
			this.async.on(this.$refs.textarea, 'input', onChange, {
				group: $$.textAreaChange
			});
		}

		this.$refs.save.once('click', () => {
			clb(this.editor.getValue());
			this.close();
		});

		this.$refs.errorBox.innerText = validate(this.$refs.textarea.value);
	}

	close(): void {
		this.$refs.dialog.style.display = 'none';
		this.editor?.toTextArea();
	}
}
