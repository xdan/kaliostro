- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< select.uk-select @change = onChange
			< option &
				v-for = v in options |
				:selected = value === v |
				:value = v
			.
				{{ v|h}}
