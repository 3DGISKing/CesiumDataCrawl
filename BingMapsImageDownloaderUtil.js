var fs = require('fs');

var CesiumMath = require('./CesiumMath');
var Cartographic = require('./Cartographic');
var WebMercatorTilingScheme = require('./WebMercatorTilingScheme');

/**
 * @constructor
 *
 * @param {Object} options Object with the following properties:
 * @param {String} options.url The url of the Bing Maps server hosting the imagery.
 * @param {String} [options.mapStyle=BingMapsStyle.AERIAL] The type of Bing Maps
 *        imagery to load.
 *
 * @see {@link http://msdn.microsoft.com/en-us/library/ff701713.aspx|Bing Maps REST Services}
 * @see {@link http://www.w3.org/TR/cors/|Cross-Origin Resource Sharing}
 */

function BingMapsImageDownloaderUtil(options) {
    this._url = options.url;
    this._mapStyle = options.mapStyle;

    this._imageUrlTemplate = 'http://ecn.{subdomain}.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=5979';
    this._imageUrlSubdomains = ['t0', 't1', 't2', 't3'];

    this._tilingScheme = new WebMercatorTilingScheme({
        numberOfLevelZeroTilesX : 2,
        numberOfLevelZeroTilesY : 2,
        ellipsoid : options.ellipsoid
    });
}

/**
 * Converts a tiles (x, y, level) position into a quadkey used to request an image
 * from a Bing Maps server.
 *
 * @param {Number} x The tile's x coordinate.
 * @param {Number} y The tile's y coordinate.
 * @param {Number} level The tile's zoom level.
 *
 * @see {@link http://msdn.microsoft.com/en-us/library/bb259689.aspx|Bing Maps Tile System}
 */

BingMapsImageDownloaderUtil.prototype.tileXYToQuadKey = function (x, y, level) {
    var quadkey = '';

    for ( var i = level; i >= 0; --i) {
        var bitmask = 1 << i;
        var digit = 0;

        if ((x & bitmask) !== 0) {
            digit |= 1;
        }

        if ((y & bitmask) !== 0) {
            digit |= 2;
        }

        quadkey += digit;
    }
    return quadkey;
};

BingMapsImageDownloaderUtil.prototype.buildImageUrl = function (x, y, level) {
    var imageUrl = this._imageUrlTemplate;

    var quadkey = this.tileXYToQuadKey(x, y, level);
    imageUrl = imageUrl.replace('{quadkey}', quadkey);

    var subdomains = this._imageUrlSubdomains;
    var subdomainIndex = (x + y + level) % subdomains.length;
    imageUrl = imageUrl.replace('{subdomain}', subdomains[subdomainIndex]);

    return imageUrl;
};

function getImageFileName(path, x, y, level) {
    return path + "/" + level + "/" + x + "/" + y + ".jpg";
}

BingMapsImageDownloaderUtil.prototype.prepareDownloadInfoList = function(path, startLevel, endLevel, left, bottom, width, height) {
    width = CesiumMath.toRadians(width);
    height = CesiumMath.toRadians(height);
    left = CesiumMath.toRadians(left);
    bottom = CesiumMath. toRadians(bottom);

    var rightOrEast = left + width;
    var topOrNorth = bottom + height;

    var infoList = [];

    var leftTop = new Cartographic(left, topOrNorth);
    var rightBottom = new Cartographic(rightOrEast, bottom);

    var ret = {};

    for (var level = startLevel; level <= endLevel; level++){
        ret = this._tilingScheme.positionToTileXY(leftTop, level, ret);

        if (ret == null) {
            continue;
        }

        var startTileX = ret.x;
        var startTileY = ret.y;

        ret = this._tilingScheme.positionToTileXY(rightBottom, level, ret);

        var endTileX = ret.x;
        var endTileY = ret.y;

        for (var x = startTileX; x <= endTileX; x++) {
            for (var y = startTileY; y <= endTileY; y++) {
                var filename = getImageFileName(path, x, y, level);

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

                var url = this.buildImageUrl(x, y, level);
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

module.exports = BingMapsImageDownloaderUtil;


