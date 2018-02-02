var DownLoader = require('./DownLoader');

var sTKTerrainDownloaderUtil = require('./STKTerrainDownloaderUtil');

var startLevel = 0;
var endLevel = 8;

var koreaLeft = 124;
var koreaRight = 131;
var koreaWidth = koreaRight- koreaLeft;

var koreaBottom = 34;
var koreaTop = 44;
var koreaHeight = koreaTop - koreaBottom;

var worldLeft = -180;
var worldRight = 180;
var worldWidth = worldRight - worldLeft;

var worldBottom = -90;
var worldTop = 90;
var worldHeight = worldTop - worldBottom;

var extensionList = [];

extensionList.push("octvertexnormals");
//extensionList.push("watermask");

var subPath = "";

if(extensionList.length == 0) {
   subPath = "no_watermask_no_vertexnormal";
}
else if (extensionList.length == 1) {
   if (extensionList[0] == "octvertexnormals") {
       subPath = "vertexnormal";
   }
   else if (extensionList[0] == "watermask") {
       subPath = "watermask";
   }
   else {
      throw new Error("invalid extension!");
   }
}
else if(extensionList.length == 2) {
    subPath = "watermask_vertexnormal";
}
else {
    throw new Error("invalid extension!");
}

var rootPath = "E:/CesiumData/assets.agi.com/stk-terrain/world/";
rootPath += subPath;

//for entire world
var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, worldLeft, worldBottom, worldWidth, worldHeight, extensionList);

//for only korea
//var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, koreaLeft, koreaBottom, koreaWidth, koreaHeight, extensionList);

console.log("total download Info count = ", downloadInfoList.length);

var timeout = 1000; // 1s

DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length, timeout);

process.on('uncaughtException', function (err) {
   console.log(err);
});