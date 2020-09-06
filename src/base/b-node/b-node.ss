- namespace [%fileName%]

- include 'super/i-block'|b as placeholder
- include 'base/b-node/modules/*.ss'|b

- template index() extends ['i-block'].index
	- block body
		< .&__wrapper
			< .&__control
				< b-icon :size = 16 | :icon = 'grid' | :button = true | @onDragStart = onDragStart

				< template v-if = !static
					< b-icon &
						:icon = !showParams ? 'chevron-left' : 'chevron-down' |
						:button = true |
						@click = toggleParams
					.

				< .&__title
					< strong v-if = name
						{{ name }}

					< span
						{{ type|h }}

				< template v-if = !static
					< b-icon &
						:icon = 'copy' |
						:button = true |
						@click = proxyEvent('copy', path)
					.

					< b-icon &
						:icon = 'trash' |
						:button = true |
						@click = proxyEvent('delete', path)
					.

					< b-icon &
						:icon = 'code' |
						:button = true |
						@click = openEditDialog
					.

				< template v-else
					< b-icon &
						:icon = 'plus' |
						:button = true |
						@click = proxyEvent('add', data)
					.
			< template v-if = !static
				+= self.params()
