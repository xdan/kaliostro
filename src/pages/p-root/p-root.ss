- namespace [%fileName%]

- include 'super/i-static-page/i-static-page.component.ss'|b as placeholder

- template index() extends ['i-static-page.component'].index
	- block body
		< b-dialog ref = dialog

		< b-maker

		< b-content &
			:content = content |
			:path = []
		.
