const PI_OVER_TWO = Math.PI * 0.5;
const TWO_PI = 2.0 * Math.PI;
const RADIANS_PER_DEGREE = Math.PI / 180.0;
//noinspection JSUnusedLocalSymbols
const DEGREES_PER_RADIAN = 180.0 / Math.PI;

const numberOfLevelZeroTilesX = 2;
const numberOfLevelZeroTilesY = 1;

function toRadians (degrees) {
    return degrees * RADIANS_PER_DEGREE;
}

/**
 * Gets the total number of tiles in the X direction at a specified level-of-detail.
 *
 * @param {Number} level The level-of-detail.
 * @returns {Number} The number of tiles in the X direction at the given level.
 */
module.exports.getNumberOfXTilesAtLevel = function(level) {
    return numberOfLevelZeroTilesX << level;
};

/**
 * Gets the total number of tiles in the Y direction at a specified level-of-detail.
 *
 * @param {Number} level The level-of-detail.
 * @returns {Number} The number of tiles in the Y direction at the given level.
 */
module.exports.getNumberOfYTilesAtLevel = function(level){
    return numberOfLevelZeroTilesY << level;
};

/**
 * Calculates the tile x, y coordinates of the tile containing
 * a given cartographic position.
 *
 * @param {Number} level The tile level-of-detail.  Zero is the least detailed.*
 * @param {number} longitude in radians
 * @param {number} latitude in radians
 * @returns {object} a new object containing the tile x, y coordinates
 */
module.exports.positionToTileXY = function(longitude, latitude, level) {
    var xTiles = exports.getNumberOfXTilesAtLevel(level);
    var yTiles = exports.getNumberOfYTilesAtLevel(level);

    var xTileWidth = TWO_PI / xTiles;
    var yTileHeight = Math.PI / yTiles;

    var west = -Math.PI;

    var xTileCoordinate = (longitude - west) / xTileWidth | 0;
    if (xTileCoordinate >= xTiles) {
        xTileCoordinate = xTiles - 1;
    }

    //noinspection UnnecessaryLocalVariableJS
    var north = PI_OVER_TWO;

    var yTileCoordinate = (north - latitude) / yTileHeight | 0;
    if (yTileCoordinate >= yTiles) {
        yTileCoordinate = yTiles - 1;
    }

    if(yTileCoordinate < 0){
        throw new Error("invalid tile index");
    }

    var result = {};

    result.x = xTileCoordinate;
    result.y = yTileCoordinate;
    return result;
};