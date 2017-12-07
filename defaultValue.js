/**
 * Returns the first parameter if not undefined, otherwise the second parameter.
 * Useful for setting a default value for a parameter.
 *
 * @exports defaultValue
 *
 * @param {*} a
 * @param {*} b
 * @returns {*} Returns the first parameter if not undefined, otherwise the second parameter.
 *
 * @example
 * param = Cesium.defaultValue(param, 'default');
 */
function defaultValue(a, b) {
    if (a !== undefined && a !== null) {
        return a;
    }
    return b;
}

module.exports = defaultValue;