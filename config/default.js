'use strict';

const
	path = require('upath'),
	config = require('@v4fire/client/config/default'),
	o = require('uniconf/options').option;

module.exports = config.createConfig({dirs: [__dirname, 'client']}, {
	__proto__: config,

	platform: 'kaliostro',

	publishSettings: {
		sort: [
			'init.js',
			'std.js',
			'assets.js',
			'codemirror.js',
			'requestidlecallback.js',
			'eventemitter2.js',
			'vue.js',
			'vendor.js',
			'root_tpl.js',
			'root.js',
		],
		excludes: [
			'dependencies.js'
		]
	}
});
