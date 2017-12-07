var defaultValue = require('./defaultValue');

/**
 * A 2D Cartesian point.
 * @alias Cartesian2
 * @constructor
 *
 * @param {Number} [x=0.0] The X component.
 * @param {Number} [y=0.0] The Y component.
 *
 * @see Cartesian3
 * @see Cartesian4
 * @see Packable
 */
function Cartesian2(x, y) {
    /**
     * The X component.
     * @type {Number}
     * @default 0.0
     */
    this.x = defaultValue(x, 0.0);

    /**
     * The Y component.
     * @type {Number}
     * @default 0.0
     */
    this.y = defaultValue(y, 0.0);
}

module.exports = Cartesian2;
