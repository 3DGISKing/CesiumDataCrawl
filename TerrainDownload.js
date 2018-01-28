var DownLoader = require('./DownLoader');

var sTKTerrainDownloaderUtil = require('./STKTerrainDownloaderUtil');

var rootPath = "E:/CesiumData/assets.agi.com/stk-terrain/world/watermask_vertexnormal";

var startLevel = 12;
var endLevel = 12;

var koreaLeft = 124;
var koreaRight = 131;
var koreaWidth = koreaRight- koreaLeft;

var koreaBottom = 34;
var koreaTop = 44;
var koreaHeight = koreaTop - koreaBottom;

var left = -180;
var right = 180;
var width = right - left;

var bottom = -90;
var top = 90;
var height = top - bottom;

var extensionList = [];

extensionList.push("octvertexnormals");
extensionList.push("watermask");

//for entire world
//var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, left, bottom, width, height, extensionList);

//for only korea
var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, koreaLeft, koreaBottom, koreaWidth, koreaHeight, extensionList);

console.log("total download Info count = ", downloadInfoList.length);

DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length);

process.on('uncaughtException', function (err) {
   console.log(err);
});