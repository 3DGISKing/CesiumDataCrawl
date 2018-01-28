var DownLoader = require('./DownLoader');

var BingMapsImageDownloaderUtil = require('./BingMapsImageDownloaderUtil');

var bingMapsImageUtil = new BingMapsImageDownloaderUtil({});
var rootPath = "E:/CesiumData/Image/BingMaps";

var startLevel = 8;
var endLevel = 8;

var left = -180;
var right = 180;
var width = right - left;

var bottom = -80; //  note Web Mercartor Latitude Range
var top = 80; //  note Web Mercartor Latitude Range
var height = top - bottom;

/**
 *  note Web Mercartor Latitude Range
 */
var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, left, bottom, width, height);

console.log("total download count = ", downloadInfoList.length);

DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length);

process.on('uncaughtException', function (err) {
    console.log(err);
});