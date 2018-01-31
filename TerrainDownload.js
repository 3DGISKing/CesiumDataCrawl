var DownLoader = require('./DownLoader');

var sTKTerrainDownloaderUtil = require('./STKTerrainDownloaderUtil');

var startLevel = 13;
var endLevel = 13;

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
//var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, left, bottom, width, height, extensionList);

//for only korea
var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, koreaLeft, koreaBottom, koreaWidth, koreaHeight, extensionList);

console.log("total download Info count = ", downloadInfoList.length);

DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length);

process.on('uncaughtException', function (err) {
   console.log(err);
});