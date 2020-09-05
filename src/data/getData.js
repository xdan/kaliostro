const schema = require("../data/schema.json");

export const merge = (a, ...args) => {
    for (const b of args) {
        if (b) {
            Object.keys(b).forEach((key) => {
                if (typeof b[key] === 'object' && b[key] !== null) {
                    a[key] = merge(Array.isArray(b[key]) ? [] : {}, a[key], b[key]);
                } else {
                    a[key] = b[key];
                }
            });
        }
    }

    return a;
};

/**
 *
 * @param path
 * @return {null|*}
 */
export const key = (path) => {
    const parts = path.replace(/^#\//, '').split('/');
    let obj = schema;


    for (const current of parts) {
        if (obj[current] === undefined) {
            return null
        }

        obj = obj[current];
    }

    const fillObject = (object) => {
        if (typeof object === 'object') {
            const filledObject = Array.isArray(object) ? [...object] : {...object};
            const keys = Object.keys(filledObject);

            for(const k of keys) {
                if (k === '$ref') {
                    return key(filledObject.$ref);
                }

                if (k === 'extends') {
                    merge(filledObject, fillObject(filledObject[k]));
                    delete filledObject['extends'];
                } else {
                    filledObject[k] = fillObject(filledObject[k]);
                }
            }

            return filledObject;
        }

        return object;
    };

    return obj !== undefined ? fillObject(obj) : null;
};

// console.log(JSON.stringify(key('#/definitions/meta/components'), null, 2));
