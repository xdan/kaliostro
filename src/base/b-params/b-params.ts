/**
 * [[include:base/b-params/README.md]]
 * @packageDocumentation
 */

import iBlock, { component, prop, wait, hook, system, watch } from 'super/i-block/i-block';
import iRoot from 'pages/p-root/p-root';
import { JSONEditor } from '@json-editor/json-editor';
import { UIKitTheme } from "base/b-params/modules/uikit.theme";
import { UIKitIcons } from "base/b-params/modules/uikit.icons";
import { fastCompare } from "pages/p-root/modules/schema";
const ru = require("base/b-params/modules/json.editor.ru.json");

export * from 'super/i-block/i-block';

/**
 * BParams
 */
@component()
export default class bParams extends iBlock {
	readonly $refs!: iBlock["$refs"] & {
		formBox: Nullable<HTMLElement>;
	};

	/** @override */
		// @ts-ignore
	readonly Root!: iRoot;

	/**
	 * Current node type
	 */
	@prop(String)
	type!: string;

	/**
	 * Current node path
	 */
	@prop(Array)
	path!: string[];

	/**
	 * Send event to parent b-content
	 */
	@prop(Function)
	proxyEvent!: Function;

	/**
	 * Node params values
	 */
	@prop(Object)
	data: Dictionary = {};

	/**
	 * Instance of Json editor
	 * @private
	 */
	@system()
	private editor!: JSONEditor;

	/**
	 * Make interactive native form after mount
	 */
	private makeJSONEditor(): void {
		this.onDestroy();

		JSONEditor.defaults.themes.uikit = UIKitTheme;
		JSONEditor.defaults.iconlibs.uikit = UIKitIcons;
		JSONEditor.defaults.languages.ru = ru;

		JSONEditor.defaults.language = "ru";

		this.editor = new JSONEditor(this.$refs.formBox, {
			collapsed: true,
			disable_edit_json: true,
			disable_properties: true,
			disable_array_delete_last_row: true,
			remove_button_labels: true,
			language: 'ru',
			schema: this.r.resolver.getSchema('#/definitions/' + this.type),
			object_layout: 'normal',
			theme: 'uikit',
			iconlib: 'uikit',
		});

		this.editor.on('ready',() => {
			this.editor.setValue(this.data);

			this.editor.on('change',this.async.debounce(() => {
				this.editor.validate();

				if (!fastCompare(this.editor.getValue(), Object.fastClone(this.data))) {
					this.proxyEvent('set-value', this.path, this.editor.getValue('root'));
				}
			}, 300));
		});
	}

	/**
	 * Обработчик: при смене типа виджета, пересчитываем всю схему
	 */
	@hook('mounted')
	@wait('ready')
	@watch('type')
	onReady(): void {
		this.makeJSONEditor();
	}

	/**
	 * Destruct JSONEditor
	 */
	@hook('beforeDestroy')
	onDestroy(): void {
		this.editor?.destroy();
	}
}
