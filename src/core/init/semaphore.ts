/*!
 * V4Fire Client Core
 * https://github.com/V4Fire/Client
 *
 * Released under the MIT license
 * https://github.com/V4Fire/Client/blob/master/LICENSE
 */

import flags from 'core/init/flags';
import { createsAsyncSemaphore } from 'core/event';
import { renderTo } from "core/init/render";

export default createsAsyncSemaphore(async () => {
	if (!IS_PROD) {
		await renderTo('[data-root-component]', {
			previewUrl: 'https://localhst:4444'
		});
	}
}, ...flags);
