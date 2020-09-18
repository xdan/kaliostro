- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< .&__modal :class = 'uk-modal uk-open' | ref = dialog
			< .&__modal-dialog :class = 'uk-modal-dialog uk-modal-body'
				< button.uk-modal-close-default.uk-icon.uk-close :uk-close = true | @click = close

				< .&__area
					< textarea.&__textarea.uk-textarea ref = textarea

				< .&__error-box ref = errorBox

				< .&__manage
					< b-button ref = save | :type = 'primary'
						Сохранить

					< b-button @click = close
						Отмена
