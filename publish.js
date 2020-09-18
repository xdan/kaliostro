const fs = require('fs-extra');
const path = require('path');
const root = process.cwd();
const clientFolder = path.resolve(root, 'dist/client');
const excludes = ['dependencies.js'];

console.log('Make published files');

const sort = [
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
];

const
	CleanCSS = require('clean-css'),
	{ minify } = require('terser');

/**
 * Read all js and css files and concat it
 * @param {string} folder
 * @param {Object} result
 */
function concatDirectory(folder, result = {
	js: [],
	css: [],
	cache: new Set()
}) {
	const
		files = fs
			.readdirSync(folder)
			.sort((fileA, fileB) => {
				const
					indexA = sort.findIndex((value) => RegExp(value).test(fileA)),
					indexB = sort.findIndex((value) => RegExp(value).test(fileB))

				return (indexA !== -1 ? indexA : 1000) - (indexB !== -1 ? indexB : 1000);
			});

	for (const file of files) {
		if (excludes.find(ex => RegExp(ex).test(file))) {
			continue;
		}

		const fileName = path.resolve(folder, file);

		if (result.cache.has(fileName)) {
			continue;
		}
		result.cache.add(fileName);

		console.log('Found: ' + fileName);

		if (fs.statSync(fileName).isDirectory()) {
			concatDirectory(fileName, result);

		} else {
			const ext = path.extname(fileName);

			if (ext === '.css') {
				result.css.push(fs.readFileSync(fileName, 'utf-8'));
			} else if (ext === '.js') {
				result.js.push(fs.readFileSync(fileName, 'utf-8'));
			}
		}
	}

	return result;
}

(async () => {
	const
		result = concatDirectory(path.resolve(clientFolder, 'lib')),
		publishFolder = path.resolve(root, 'public');

	concatDirectory(clientFolder, result);

	const minifyJS = await minify(result.js.join(';\n'), {
		sourceMap: false,
		keep_classnames: true
	});

	fs.writeFileSync(path.resolve(publishFolder, 'kaliostro.min.js'), minifyJS.code);

	const miniCSS = new CleanCSS({}).minify(result.css.join(''));
	fs.writeFileSync(path.resolve(publishFolder, 'kaliostro.min.css'), miniCSS.styles);

	console.log('Generation publish files - finished');
})();
