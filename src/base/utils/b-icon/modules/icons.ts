import iconsPlugin from 'uikit/dist/js/uikit-icons.min.js';

const iconsStore = {};

iconsPlugin({
	icon: {
		add(store): void {
			Object.assign(iconsStore, store);
		}
	}
});

export default iconsStore;
