/**
 * [[include:base/dialogs/b-dialog/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, system } from 'super/i-block/i-block';
import bButton from "form/b-button/b-button";

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

		this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
			name: "javascript",
			json: true,
			lineNumbers: true,
			foldGutter: true,
			gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
		});

		this.$refs.save.once('click', () => {
			clb(this.editor.getValue());
			this.close();
		});

		this.editor.on('change', this.async.debounce(() => {
			this.$refs.errorBox.innerText = validate(this.editor.getValue());
		}, 300));

		this.$refs.errorBox.innerText = validate(this.editor.getValue());
	}

	close(): void {
		this.$refs.dialog.style.display = 'none';
		this.editor.toTextArea();
	}
}
