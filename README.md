# CesiumDataCrawl

[![](http://img.youtube.com/vi/rqApLap6G6Y/0.jpg)](http://www.youtube.com/watch?v=rqApLap6G6Y "")

Sometimes we need to run Cesium without the internet connection.
Usually, all Cesium data such as imagery, the terrain is streamed from several remote servers.
How can I get Cesium data?
Please use this, CesiumDataCrawl.

## Microsoft BingMap Image download

var downLoader = require('./../Downloader');

var BingMapsImageDownloaderUtil = require('./../BingMapsImageDownloaderUtil');

var bingMapsImageUtil = new BingMapsImageDownloaderUtil({});

var savePath =__dirname + "/../CesiumData/Image/BingMaps";

var startLevel = 1;
var endLevel = 5;

var requestRect = require('./../RequestRect/WorldWebMercatorRect');
requestRect = requestRect.RequestRect();

var downloadInfoList = bingMapsImageUtil.prepareDownloadInfoList(savePath, startLevel, endLevel, requestRect.left, requestRect.bottom, requestRect.width, requestRect.height);

var timeout = 1000; // 1s

downLoader.recursivelyDownload(downloadInfoList, downloadInfoList.length, timeout);

