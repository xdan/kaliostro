- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< .&__wrapper
			< b-node &
				v-for = (el, i) in content |
				v-if = el |
				:key = path.concat(i).join('/') |
				:data = el |
				:static = static |
				:path = path.concat(i)
			.
