var defaultValue = require('./defaultValue');
var CesiumMath = require('./CesiumMath');

/**
 * A two dimensional region specified as longitude and latitude coordinates.
 *
 * @alias Rectangle
 * @constructor
 *
 * @param {Number} [west=0.0] The westernmost longitude, in radians, in the range [-Pi, Pi].
 * @param {Number} [south=0.0] The southernmost latitude, in radians, in the range [-Pi/2, Pi/2].
 * @param {Number} [east=0.0] The easternmost longitude, in radians, in the range [-Pi, Pi].
 * @param {Number} [north=0.0] The northernmost latitude, in radians, in the range [-Pi/2, Pi/2].
 *
 * @see Packable
 */
function Rectangle(west, south, east, north) {
    /**
     * The westernmost longitude in radians in the range [-Pi, Pi].
     *
     * @type {Number}
     * @default 0.0
     */
    this.west = defaultValue(west, 0.0);

    /**
     * The southernmost latitude in radians in the range [-Pi/2, Pi/2].
     *
     * @type {Number}
     * @default 0.0
     */
    this.south = defaultValue(south, 0.0);

    /**
     * The easternmost longitude in radians in the range [-Pi, Pi].
     *
     * @type {Number}
     * @default 0.0
     */
    this.east = defaultValue(east, 0.0);

    /**
     * The northernmost latitude in radians in the range [-Pi/2, Pi/2].
     *
     * @type {Number}
     * @default 0.0
     */
    this.north = defaultValue(north, 0.0);
}

/**
 * Returns true if the cartographic is on or inside the rectangle, false otherwise.
 *
 * @param {Rectangle} rectangle The rectangle
 * @param {Cartographic} cartographic The cartographic to test.
 * @returns {Boolean} true if the provided cartographic is inside the rectangle, false otherwise.
 */
Rectangle.contains = function(rectangle, cartographic) {
    //>>includeStart('debug', pragmas.debug);
    // Check.typeOf.object('rectangle', rectangle);
    // Check.typeOf.object('cartographic', cartographic);
    //>>includeEnd('debug');

    var longitude = cartographic.longitude;
    var latitude = cartographic.latitude;

    var west = rectangle.west;
    var east = rectangle.east;

    if (east < west) {
        east += CesiumMath.TWO_PI;
        if (longitude < 0.0) {
            longitude += CesiumMath.TWO_PI;
        }
    }
    return (longitude > west || CesiumMath.equalsEpsilon(longitude, west, CesiumMath.EPSILON14)) &&
        (longitude < east || CesiumMath.equalsEpsilon(longitude, east, CesiumMath.EPSILON14)) &&
        latitude >= rectangle.south &&
        latitude <= rectangle.north;
};



module.exports = Rectangle;