var DownLoader = require('./DownLoader');
var sTKTerrainDownloaderUtil = require('./STKTerrainDownloaderUtil');

var startLevel = parseInt(process.argv[2]);
var endLevel = parseInt(process.argv[3]);
var requestRect = require(process.argv[4]);
requestRect = requestRect.RequestRect();

console.log("startLevel = " + startLevel);
console.log("endLevel = " + endLevel);
console.log("requestRect = " + requestRect.name);

var extensionList = [];

//extensionList.push("octvertexnormals");
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

var downloadInfoList = sTKTerrainDownloaderUtil.prepareDownloadInfoList(rootPath, startLevel, endLevel, requestRect.left, requestRect.bottom, requestRect.width, requestRect.height, extensionList);

console.log("total download Info count = ", downloadInfoList.length);

var timeout = 1000; // 1s

DownLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length, timeout);

process.on('uncaughtException', function (err) {
   console.log(err);
});