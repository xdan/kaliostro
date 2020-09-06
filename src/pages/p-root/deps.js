const deps = include('@super/src/super/i-static-page/deps', __dirname);

deps.styles.set('uikit', {
	defer: false,
	src: 'uikit/dist/css/uikit.min.css'
});

deps.styles.set('codemirror', {
	defer: false,
	src: 'codemirror/lib/codemirror.css'
});

deps.scripts.set('uikit', 'uikit/dist/js/uikit.js');
deps.scripts.set('uikit-icons', 'uikit/dist/js/uikit-icons.js');
deps.scripts.set('codemirror', 'codemirror/lib/codemirror.js');
deps.scripts.set('codemirror-javascript', 'codemirror/mode/javascript/javascript.js');

module.exports = deps;
