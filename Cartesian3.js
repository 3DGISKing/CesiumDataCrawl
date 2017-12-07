var defaultValue = require('./defaultValue');

/**
 * A 3D Cartesian point.
 * @alias Cartesian3
 * @constructor
 *
 * @param {Number} [x=0.0] The X component.
 * @param {Number} [y=0.0] The Y component.
 * @param {Number} [z=0.0] The Z component.
 *
 * @see Cartesian2
 * @see Cartesian4
 * @see Packable
 */
function Cartesian3(x, y, z) {
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

    /**
     * The Z component.
     * @type {Number}
     * @default 0.0
     */
    this.z = defaultValue(z, 0.0);
}

module.exports = Cartesian3;
