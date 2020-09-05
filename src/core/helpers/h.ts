const humanity = require('data/humanity.json');

/**
 * Get humanity key
 * @param key
 */

export const h = (key: string): string => {
	return humanity[key] ?? key;
}
