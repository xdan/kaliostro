- namespace [%fileName%]

- include 'super/i-input'|b as placeholder

- template index() extends ['i-input'].index
	- block input
		< select.uk-select.uk-form-small &
			:multiple = multiple |
			:size = size |
			@change = onChange
		.
			< option &
				v-for = v in options |
				:selected = values.includes(v) |
				:value = v
			.
				{{ v|h}}
