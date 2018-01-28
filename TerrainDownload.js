var DownLoader = require('./DownLoader');

var sTKTerrainDownloaderUtil = require('./STKTerrainDownloaderUtil');

var rootPath = "E:/CesiumData/assets.agi.com/stk-terrain/world/watermask_vertexnormal";

var startLevel = 0;
var endLevel = 8;

var left = -180;
var right = 180;
var width = right - left;

var bottom = -90;
var top = 90;
var height = top - bottom;

var extensionList = [];

extensionList.push("octvertexnormals");
extensionList.push("watermask");

var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, left, bottom, width, height, extensionList);

console.log("total download count = ", downloadInfoList.length);

DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length);

process.on('uncaughtException', function (err) {
   console.log(err);
});