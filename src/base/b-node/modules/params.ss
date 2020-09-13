- namespace ['b-node']

/**
 * Params of node
 */
- block index->params()
	< ?.${self.name()}
		< .&__params v-if = showParams
			< b-select.&__component-type &
				:value = type |
				:label = 'Тип' |
				:name = 'component' |
				:options = r.getKey('#/definitions/componentName/enum') |
				@onChange = (value) => proxyEvent('set-value', path.concat(['component']), value)
			.

			< b-params &
				v-if = params |
				:type = type |
				:params = params |
				:path = path.concat('params') |
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
