var defaultValue = require('./defaultValue');

/**
 * A position defined by longitude, latitude, and height.
 * @alias Cartographic
 * @constructor
 *
 * @param {Number} [longitude=0.0] The longitude, in radians.
 * @param {Number} [latitude=0.0] The latitude, in radians.
 * @param {Number} [height=0.0] The height, in meters, above the ellipsoid.
 *
 * @see Ellipsoid
 */
function Cartographic(longitude, latitude, height) {
    /**
     * The longitude, in radians.
     * @type {Number}
     * @default 0.0
     */
    this.longitude = defaultValue(longitude, 0.0);

    /**
     * The latitude, in radians.
     * @type {Number}
     * @default 0.0
     */
    this.latitude = defaultValue(latitude, 0.0);

    /**
     * The height, in meters, above the ellipsoid.
     * @type {Number}
     * @default 0.0
     */
    this.height = defaultValue(height, 0.0);
}

module.exports = Cartographic;
