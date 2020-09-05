- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< span &
			:style = {
				width: size + 'px',
				height: size + 'px',
				cursor: cursor
			} |
			:uk-icon = icon |
			:class = button ? 'uk-icon-button' : ''
		.
