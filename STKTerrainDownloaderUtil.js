var fs = require('fs');
var CesiumMath = require('./CesiumMath');
var GeographicTilingSchema = require('./GeographicTilingScheme');
var STKTerrainMetaData = require('./STKTerrainMetaData.json');
var availableTiles = STKTerrainMetaData.available;

function getTerrainUrl(x, y, level) {
    var baseUrl = "http://assets.agi.com/stk-terrain/world";
    var tileUrlTemplate = "{z}/{x}/{y}.terrain?v={version}";

    tileUrlTemplate = baseUrl + "/" + tileUrlTemplate;

    var version = "1.31376.0";
    tileUrlTemplate = tileUrlTemplate.replace('{version}', version);

    //noinspection UnnecessaryLocalVariableJS,JSCheckFunctionSignatures
    var url = tileUrlTemplate.replace('{z}', level).replace('{x}', x).replace('{y}', y);

    return url;
}

function getTerranFileName(path, x, y, level) {
    return path + "/" + level + "/" + x + "/" + y + ".terrain"; // note that  gzip file format
}

function checkAvailabilty(x, y, level) {
    var rangesAtLevel = availableTiles[level];

    for (var rangeIndex = 0; rangeIndex < rangesAtLevel.length; ++rangeIndex) {
        var range = rangesAtLevel[rangeIndex];

        if(x >= range.startX && x <= range.endX && y >= range.startY && y <= range.endY)
            return true;
    }

    return false;
}

/**
 * @param {string} path
 * @param {number} startLevel
 * @param {number} endLevel
 * @param {number} left in degrees
 * @param {number} bottom  in degrees
 * @param {number} width in degrees
 * @param {number} height in degrees
 * @param {Array} extensionsList
 */
module.exports.prepareDownloadInfoList = function(path, startLevel, endLevel, left, bottom, width, height, extensionsList) {
    if(startLevel > endLevel)
    {
        console.error("invalid start level: " + startLevel);
        return;
    }

    if(startLevel < STKTerrainMetaData.minzoom || startLevel > STKTerrainMetaData.maxzoom) {
        console.error("invalid start level: " + startLevel);
        return;
    }

    if(endLevel < STKTerrainMetaData.minzoom || endLevel > STKTerrainMetaData.maxzoom) {
        console.error("invalid end level: " + startLevel);
        return;
    }

    width = CesiumMath.toRadians(width);
    height = CesiumMath.toRadians(height);
    left = CesiumMath.toRadians(left);
    bottom = CesiumMath.toRadians(bottom);

    var rightOrEast = left + width;
    var topOrNorth = bottom + height;

    var infoList = [];

    var headers = null;

    if (extensionsList == null || extensionsList.length == 0) {
        headers = {
            'Accept': 'application/vnd.quantized-mesh,application/octet-stream;q=0.9,*/*;q=0.01'
        };
    }
    else {
        var extensions = extensionsList.join('-');

        headers = {
            'Accept': 'application/vnd.quantized-mesh;extensions=' + extensions + ',application/octet-stream;q=0.9,*/*;q=0.01'
        };
    }

    for (var level = startLevel; level <= endLevel; level++){
        var res = GeographicTilingSchema.positionToTileXY(left, topOrNorth, level);

        var startTileX = res.x;
        var startTileY = res.y;

        res = GeographicTilingSchema.positionToTileXY(rightOrEast, bottom, level);

        var endTileX = res.x;
        var endTileY = res.y;

        for (var x = startTileX; x <= endTileX; x++) {
            for (var y = startTileY; y <= endTileY; y++) {
                if(!checkAvailabilty(x, y, level)) {
                    console.log("x = " + x + " y = " + y + " level = " + level + " not available!");
                    continue;
                }

                var filename = getTerranFileName(path, x, y, level);

                if (fs.existsSync(filename)) {
                     const stats = fs.statSync(filename);
                     const fileSizeInBytes = stats.size;

                     if (fileSizeInBytes == 0) {
                        fs.unlinkSync(filename);
                     }
                     else {
                        continue;
                     }
                 }

                var url = getTerrainUrl(x, y, level);

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







