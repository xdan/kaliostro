- namespace ['b-node']

/**
 * Params of node
 */
- block index->params()
	< ?.${self.name()}
		< .&__params v-if = showParams
			< b-select &
				:value = type |
				:path = path.concat(['component']) |
				:options = r.getKey('definitions/meta/components') |
				@onChange = r.setValue
			.

			< b-params v-if = params | :params = params | :path = path.concat('params')

			< .&__children v-if = children.length
				< .&__children-title
					Внутренние элементы

				< b-content &
					:content = children |
					:path = path.concat(childrenKey.split('.')) |
					:static = static
				.
