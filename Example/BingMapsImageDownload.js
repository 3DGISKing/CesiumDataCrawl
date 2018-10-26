var downLoader = require('./../Downloader');

var BingMapsImageDownloaderUtil = require('./../BingMapsImageDownloaderUtil');

var bingMapsImageUtil = new BingMapsImageDownloaderUtil({});

var savePath =__dirname + "/../CesiumData/Image/BingMaps";

var qq = parseInt(process.argv[2]);

console.log(qq);

var startLevel = 1; // parseInt(process.argv[2]);
var endLevel = 5;   // parseInt(process.argv[3]);

var requestRect = require('./../RequestRect/WorldWebMercatorRect'); // require(process.argv[4]);
requestRect = requestRect.RequestRect();

console.log("startLevel = " + startLevel);
console.log("endLevel = " + endLevel);
console.log("requestRect = " + requestRect.name);

var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(savePath, startLevel, endLevel, requestRect.left, requestRect.bottom, requestRect.width, requestRect.height);

console.log("total download count = ", downloadInfoList.length);

var timeout = 1000; // 1s

downLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length, timeout);

process.on('uncaughtException', function (err) {
    console.log(err);
});