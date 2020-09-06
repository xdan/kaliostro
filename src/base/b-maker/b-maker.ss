- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< b-button.&__make-button :type = 'default' | @click = toggleDropDown
			< b-icon :icon = 'plus' | :size = 12

		< .&__drop-down.uk-dropdown
      < b-content &
      	:content = defaultParams |
      	:path = path |
      	:static = true
      .
