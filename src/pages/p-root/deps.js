const deps = include('@super/src/super/i-static-page/deps', __dirname);

deps.styles.set('uikit', {
	defer: false,
	src: 'uikit/dist/css/uikit.min.css'
});

deps.styles.set('codemirror', {
	defer: false,
	src: 'codemirror/lib/codemirror.css'
});

deps.styles.set('codemirror-foldgutter', {
	defer: false,
	src: 'codemirror/addon/fold/foldgutter.css'
});

deps.scripts.set('uikit', 'uikit/dist/js/uikit.js');
deps.scripts.set('uikit-icons', 'uikit/dist/js/uikit-icons.js');
deps.scripts.set('codemirror', 'codemirror/lib/codemirror.js');
deps.scripts.set('codemirror-javascript', 'codemirror/mode/javascript/javascript.js');
deps.scripts.set('codemirror-javascript-foldcode', 'codemirror/addon/fold/foldcode.js');
deps.scripts.set('codemirror-javascript-foldgutter', 'codemirror/addon/fold/foldgutter.js');
deps.scripts.set('codemirror-javascript-brace-fold', 'codemirror/addon/fold/brace-fold.js');

module.exports = deps;
