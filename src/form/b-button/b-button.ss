- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< button.&__button.uk-button &
			:class = 'uk-button-' + type + ' uk-button-' + size
		.
			+= self.slot()

