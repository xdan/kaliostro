- namespace [%fileName%]

- include 'super/i-block'|b as placeholder

- template index() extends ['i-block'].index
	- block body
		< .&__properties
			< .&__property &
				v-for = el in properties |
				:key = el.key
			.
				< template v-if = (el.type === 'string' || el.type === 'number')
					< b-input &
						:type = el.type |
						:label = el.label || el.key |
						:value = params[el.key] |
						:name = el.key |
						@onChange = onChange
					.

				< template v-else-if = el.type === 'object'
					< b-params &
						:type = el.type |
						:params = params[el.key] |
						:path = path.concat(el.key) |
						:proxyEvent = proxyEvent
					.
