import 'core/init/state';
import 'core/init/abt';
import 'core/init/prefetch';

import {resolveAfterDOMLoaded} from 'core/event';
import semaphore from 'core/init/semaphore';
import { renderTo } from "core/init/render";

window.v4fire = {
	renderTo
};

resolveAfterDOMLoaded().then(() => semaphore('domReady'));
