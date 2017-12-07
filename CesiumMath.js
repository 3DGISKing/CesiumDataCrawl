var defaultValue = require('./defaultValue');

var CesiumMath = {};

CesiumMath.PI_OVER_TWO = Math.PI * 0.5;
CesiumMath.TWO_PI = 2.0 * Math.PI;
CesiumMath.RADIANS_PER_DEGREE = Math.PI / 180.0;
//noinspection JSUnusedLocalSymbols
CesiumMath.DEGREES_PER_RADIAN = 180.0 / Math.PI;

/**
 * 0.1
 * @type {Number}
 * @constant
 */
CesiumMath.EPSILON1 = 0.1;

/**
 * 0.00000000000001
 * @type {Number}
 * @constant
 */
CesiumMath.EPSILON14 = 0.00000000000001;

CesiumMath.toRadians = function(degrees) {
    return degrees * CesiumMath.RADIANS_PER_DEGREE;
};

/**
 * Determines if two values are equal using an absolute or relative tolerance test. This is useful
 * to avoid problems due to roundoff error when comparing floating-point values directly. The values are
 * first compared using an absolute tolerance test. If that fails, a relative tolerance test is performed.
 * Use this test if you are unsure of the magnitudes of left and right.
 *
 * @param {Number} left The first value to compare.
 * @param {Number} right The other value to compare.
 * @param {Number} relativeEpsilon The maximum inclusive delta between <code>left</code> and <code>right</code> for the relative tolerance test.
 * @param {Number} [absoluteEpsilon=relativeEpsilon] The maximum inclusive delta between <code>left</code> and <code>right</code> for the absolute tolerance test.
 * @returns {Boolean} <code>true</code> if the values are equal within the epsilon; otherwise, <code>false</code>.
 *
 * @example
 * var a = Cesium.Math.equalsEpsilon(0.0, 0.01, Cesium.Math.EPSILON2); // true
 * var b = Cesium.Math.equalsEpsilon(0.0, 0.1, Cesium.Math.EPSILON2);  // false
 * var c = Cesium.Math.equalsEpsilon(3699175.1634344, 3699175.2, Cesium.Math.EPSILON7); // true
 * var d = Cesium.Math.equalsEpsilon(3699175.1634344, 3699175.2, Cesium.Math.EPSILON9); // false
 */
CesiumMath.equalsEpsilon = function(left, right, relativeEpsilon, absoluteEpsilon) {
    //>>includeStart('debug', pragmas.debug);
    /*if (!defined(left)) {
        throw new DeveloperError('left is required.');
    }
    if (!defined(right)) {
        throw new DeveloperError('right is required.');
    }
    if (!defined(relativeEpsilon)) {
        throw new DeveloperError('relativeEpsilon is required.');
    }*/

    //>>includeEnd('debug');
    absoluteEpsilon = defaultValue(absoluteEpsilon, relativeEpsilon);
    var absDiff = Math.abs(left - right);
    return absDiff <= absoluteEpsilon || absDiff <= relativeEpsilon * Math.max(Math.abs(left), Math.abs(right));
};

module.exports = CesiumMath;
