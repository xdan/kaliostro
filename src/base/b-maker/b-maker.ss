- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< b-button.&__make-button :type = 'primary' | @click = toggleDropDown
			< b-icon :icon = 'plus' | :size = 12
			< span
				Создать

		< .&__drop-down.uk-dropdown v-show = showDropDown
      < b-content &
      	:content = defaultParams |
      	:path = [] |
      	:static = true
      .
