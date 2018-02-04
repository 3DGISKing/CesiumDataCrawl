var DownLoader = require('./DownLoader');

var BingMapsImageDownloaderUtil = require('./BingMapsImageDownloaderUtil');

var bingMapsImageUtil = new BingMapsImageDownloaderUtil({});
var rootPath = "E:/CesiumData/Image/BingMaps";

var startLevel = parseInt(process.argv[2]);
var endLevel = parseInt(process.argv[3]);
var requestRect = require(process.argv[4]);
requestRect = requestRect.RequestRect();

console.log("startLevel = " + startLevel);
console.log("endLevel = " + endLevel);
console.log("requestRect = " + requestRect.name);

var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, requestRect.left, requestRect.bottom, requestRect.width, requestRect.height);

console.log("total download count = ", downloadInfoList.length);

var timeout = 1000; // 1s
DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length, timeout);

process.on('uncaughtException', function (err) {
    console.log(err);
});