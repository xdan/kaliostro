- namespace ['b-node']

/**
 * Params of node
 */
- block index->params()
	< ?.${self.name()}
		< .&__params v-if = showParams
			< b-params &
				:type = type |
				:data = data |
				:path = path |
				:proxyEvent = proxyEvent
			.

			< .&__children
				< .&__children-title
					< span
						Внутренние элементы

					< b-maker :path = path.concat(childrenKey.split('.'))

				< b-content &
					:content = children |
					:path = path.concat(childrenKey.split('.')) |
					:static = static
				.
