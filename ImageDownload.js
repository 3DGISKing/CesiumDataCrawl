var DownLoader = require('./DownLoader');

var BingMapsImageDownloaderUtil = require('./BingMapsImageDownloaderUtil');

var bingMapsImageUtil = new BingMapsImageDownloaderUtil({});
var rootPath = "E:/CesiumData/Image/BingMaps";

var startLevel = 14;
var endLevel = 14;

var koreaLeft = 124;
var koreaRight = 131;
var koreaWidth = koreaRight- koreaLeft;

var koreaBottom = 34;
var koreaTop = 44;
var koreaHeight = koreaTop - koreaBottom;

var worldLeft = -180;
var worldRight = 180;
var worldWidth = worldRight - worldLeft;

var worldBottom = -80; //  note Web Mercartor Latitude Range
var worldTop = 80; //  note Web Mercartor Latitude Range
var worldHeight = worldTop - worldBottom;

/**
 *  note Web Mercartor Latitude Range
 */
// for entire world
//var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, worldLeft, worldBottom, worldWidth, worldHeight);

// for only korea
var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, koreaLeft, koreaBottom, koreaWidth, koreaHeight);

console.log("total download count = ", downloadInfoList.length);

var timeout = 1000; // 1s
DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length, timeout);

process.on('uncaughtException', function (err) {
    console.log(err);
});