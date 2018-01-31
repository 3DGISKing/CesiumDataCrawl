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

var left = -180;
var right = 180;
var width = right - left;

var bottom = -80; //  note Web Mercartor Latitude Range
var top = 80; //  note Web Mercartor Latitude Range
var height = top - bottom;

/**
 *  note Web Mercartor Latitude Range
 */
// for entire world
//var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, left, bottom, width, height);

// for only korea
var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, koreaLeft, koreaBottom, koreaWidth, koreaHeight);

console.log("total download count = ", downloadInfoList.length);

DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length);

process.on('uncaughtException', function (err) {
    console.log(err);
});