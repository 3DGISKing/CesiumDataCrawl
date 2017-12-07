var CesiumMath = require('./CesiumMath');
var GeographicTilingSchema = require('./GeographicTilingScheme');

function getTerrainUrl(x, y, level) {
    var baseUrl = "http://assets.agi.com/stk-terrain/world";
    var tileUrlTemplate = "{z}/{x}/{y}.terrain?v={version}";

    tileUrlTemplate = baseUrl + "/" + tileUrlTemplate;

    var version = "1.31376.0";
    tileUrlTemplate = tileUrlTemplate.replace('{version}', version);

    var yTiles = GeographicTilingSchema.getNumberOfYTilesAtLevel(level);

    var tmsY = (yTiles - y - 1);

    //noinspection UnnecessaryLocalVariableJS,JSCheckFunctionSignatures
    var url = tileUrlTemplate.replace('{z}', level).replace('{x}', x).replace('{y}', tmsY);

    return url;
}

function getTerranFileName(path, x, y, level) {
    return path + "/" + level + "/" + x + "/" + y + ".terrain.zip";
}

/**
 * @param {string} path
 * @param {number} startLevel
 * @param {number} endLevel
 * @param {number} left in degrees
 * @param {number} bottom  in degrees
 * @param {number} width in degrees
 * @param {number} height in degrees
 */
module.exports.prepareDownloadInfoList = function(path, startLevel, endLevel, left, bottom, width, height) {
    width = CesiumMath.toRadians(width);
    height = CesiumMath.toRadians(height);
    left = CesiumMath.toRadians(left);
    bottom = CesiumMath.toRadians(bottom);

    var rightOrEast = left + width;
    var topOrNorth = bottom + height;

    var infoList = [];

    for (var level = startLevel; level <= endLevel; level++){
        var res = GeographicTilingSchema.positionToTileXY(left, topOrNorth, level);

        var startTileX = res.x;
        var startTileY = res.y;

        res = GeographicTilingSchema.positionToTileXY(rightOrEast, bottom, level);

        var endTileX = res.x;
        var endTileY = res.y;

        for (var x = startTileX; x <= endTileX; x++) {
            for (var y = startTileY; y <= endTileY; y++) {
                var filename = getTerranFileName(path, x, y, level);

                /*if (fs.existsSync(filename)) {
                 const stats = fs.statSync(filename);
                 const fileSizeInBytes = stats.size;

                 if (fileSizeInBytes == 0) {
                 fs.unlinkSync(filename);
                 }
                 else {
                 continue;
                 }
                 }*/

                var url = getTerrainUrl(x, y, level);
                var headers = [];

                infoList.push({
                    url: url,
                    filename: filename,
                    headers: headers
                });
            }
        }
    }

    return infoList;
};







