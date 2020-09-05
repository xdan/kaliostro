const deps = include('@super/src/super/i-static-page/deps', __dirname);

deps.styles.set('uikit', {
	defer: false,
	src: 'uikit/dist/css/uikit.min.css'
});
deps.scripts.set('uikit', 'uikit/dist/js/uikit.js');
deps.scripts.set('uikit-icons', 'uikit/dist/js/uikit-icons.js');

module.exports = deps;
