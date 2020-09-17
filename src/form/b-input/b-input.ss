- namespace [%fileName%]

- include 'super/i-input'|b as placeholder

- template index() extends ['i-input'].index
	- block input
		< input.uk-input.uk-form-small &
			:type = type |
			:value = value |
			@input = onInput |
			@blur = onBlur |
			@focus = onFocus
		.
