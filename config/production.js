'use strict';

const
	config = include('config/default');

module.exports = config.createConfig({dirs: [__dirname], mod: '@super/config/production'}, {
	__proto__: config
});
