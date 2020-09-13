- namespace [%fileName%]

- include 'super/i-static-page/i-static-page.component.ss'|b as placeholder

- template index() extends ['i-static-page.component'].index
	- block body
		< .&__wrapper
			< .&__settings
				< b-dialog ref = dialog

				< b-maker

				< b-content &
					:content = content |
					:path = []
				.

			< .&__preview
				< .&__phone-view
					< iframe ref = preview | src = http://localhost:4444
