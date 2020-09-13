- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< .&__label.uk-form-label v-if = label
			{{ label|h}}

		- block input
			< input.uk-input.uk-form-small &
				:value = value
			.
