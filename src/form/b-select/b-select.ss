- namespace [%fileName%]

- include 'super/i-input'|b as placeholder

- template index() extends ['i-input'].index
	- block input
		< select.uk-select.uk-form-small @change = onChange
			< option &
				v-for = v in options |
				:selected = value === v |
				:value = v
			.
				{{ v|h}}
